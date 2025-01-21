from .models.SanpayPayment import SanpayPayment
from .models.SanpayTransferDetail import SanpayTransferDetail
from django.db import transaction
from django.conf import settings
import service.sanpay_rtgs as sanpay_rtgs
import service.celery_tasks as celery_tasks


def message_validation(data):
    try:
        missing_key = None

        if 'payment_reference' not in data or data['payment_reference'] == '':
            missing_key = 'Invalid request. A field or property with the name \'payment_reference\' is missing on the data source.'
        elif 'payment_settlement_date' not in data or data['payment_settlement_date'] == '':
            missing_key = 'Invalid request. A field or property with the name \'payment_settlement_date\' is missing on the data source.'
        elif 'creditor_direct_agent' not in data or data['creditor_direct_agent'] == '':
            missing_key = 'Invalid request. A field or property with the name \'creditor_direct_agent\' is missing on the data source.'
        elif 'payment_method' not in data or data['payment_method'] == '':
            missing_key = 'Invalid request. A field or property with the name \'payment_method\' is missing on the data source.'
        
        if data['payment_method'] not in settings.PAYMENT_METHODS:
            missing_key = 'Invalid request. A field or property with the name \'payment_method\' is wrongly selected on the data source.'

        if len(data['transfers']) > 1 and data['payment_method'] in ['RTGS-SCCT', 'RTGS-FICT']:
            missing_key = f'Invalid request. Multiple transfers for payment method \'{data["payment_method"]}\' is not allowed.'
        
        if missing_key is not None: return False, missing_key

        data = data['transfers']

        for dict in data:
            if 'debtor_client' not in dict:
                missing_key = 'Invalid request. A field or property with the name \'debtor_client\' is missing on the data source.'
            elif 'debtor_client_account' not in dict:
                missing_key = 'Invalid request. A field or property with the name \'debtor_client_account\' is missing on the data source.'
            elif 'creditor_agent_account' not in dict or dict['creditor_agent_account'] == '':
                missing_key = 'Invalid request. A field or property with the name \'creditor_agent_account\' is missing on the data source.'
            elif 'creditor_client' not in dict:
                missing_key = 'Invalid request. A field or property with the name \'creditor_client\' is missing on the data source.'
            elif 'creditor_client_account' not in dict:
                missing_key = 'Invalid request. A field or property with the name \'creditor_client_account\' is missing on the data source.'
            elif 'transfer_amount' not in dict or dict['transfer_amount'] == '':
                missing_key = 'Invalid request. A field or property with the name \'transfer_amount\' is missing on the data source.'
        
            if missing_key is not None: return False, missing_key

        return True, missing_key
    except Exception as e:
        return False, str(e)

def create_payment(data):
    try:
        # print('Inside create payment' + str(data))
        payment_instance = SanpayPayment()
        with transaction.atomic():
            payment_instance.setter(data, 'debit', 'pending')
            payment_instance.save()
            transfer_no = 1
            for item in data['transfers']:
                transaction_instance = SanpayTransferDetail()
                transaction_instance.setter(item, payment_instance, data['payment_reference'] + '/' + str(transfer_no), data['creditor_direct_agent'])
                transaction_instance.save()
                transfer_no+=1
        celery_tasks.process_new_payment.delay(payment_id=payment_instance.payment_id)
        return True, 'success'
    except Exception as e:
        return False, str(e)

def process_payment(payment_id):
    process_status = False
    process_message = ''
    try:
        payment_instance = SanpayPayment.objects.get(payment_id=payment_id)
    except Exception as e:
        process_status = False
        process_message = str(e)
        return process_status, process_message
    try:
        if payment_instance.payment_status == 'processing':
            process_status = True
            process_message = 'The payment is currently being processed.'
        else:
            payment_instance.payment_status = 'processing'
            payment_instance.save()
            if payment_instance.payment_method in settings.RTGS_PAYMENT_METHODS:
                is_success, error_message = process_payment_through_rtgs(payment_instance)
                if is_success:
                    process_status = True
                    process_message = 'Success'
                else:
                    process_status = False
                    process_message = error_message
    except Exception as e:
        process_status = False
        process_message = str(e)
    finally:
        # if not process_status:
        payment_instance.payment_status = 'pending'
        payment_instance.save()
        return process_status, process_message
    
def process_payment_through_rtgs(payment_instance):
    process_status, document = sanpay_rtgs.prepare_message_document(payment_instance)
    signature = sanpay_rtgs.sign_message_document(document)
    message = sanpay_rtgs.prepare_message_data(signature, document, payment_instance)
    sanpay_rtgs.post_message(message=message, payment_instance=payment_instance)
    
    return process_status, message