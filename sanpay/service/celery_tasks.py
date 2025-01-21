from celery import shared_task
from django.db import connection
import service.sanpay as sanpay 

def dictfetchall(cursor):
	columns = [col[0] for col in cursor.description]
	return [dict(zip(columns, row)) for row in cursor.fetchall()]

# @shared_task(bind=True)
# def test_func(self):
#     #operations
#     for i in range(10):
#         print(i)
#     return "Done"

@shared_task
def push_new_payments():
    raw_query = '''
    SELECT 
        [Issue Ledger Out].[Trans_No] As 'payment_reference',
		[Issue Ledger Out].[Settlement_Date] as 'payment_settlement_date',
		STP.bpi1 as 'creditor_direct_agent',
		CASE
			WHEN STP.CN = 103 THEN 'RTGS-SCCT'
			WHEN STP.CN = 102 THEN 'RTGS-MCCT'
			WHEN STP.CN = 202 THEN 'RTGS-FICT'
		END as 'payment_method',
		[Issue Ledger Out].[Full_Name] as 'debtor_client',
		[Issue Ledger Out].[Account_No] as 'debtor_client_account',
		STP.bobic as 'creditor_agent_account',
		[bn1]+[bn2]+[bn3]+[bn4] as 'creditor_client',
		STP.bpi as 'creditor_client_account',
		STP.amt as 'transfer_amount'
    FROM [Issue Ledger Out] RIGHT JOIN STP ON [Issue Ledger Out].Trans_No = STP.Trans_No
	WHERE [Transanction_Type] = 'Transfer Outflow' and ([is_sanpay] IS NULL or [is_sanpay] = 'N')
    '''
    with connection.cursor() as cursor:
        cursor.execute(raw_query)
        new_records = dictfetchall(cursor)
    
    # print(new_records)
    # Get new records that haven't been sent
    # new_records = SourceRecord.objects.filter(is_sent=False)

    if not new_records:
        return "No new records to push"

    # # Process each new record
    for record in new_records:
        data = {
                "payment_reference": str(int(record['payment_reference'])),
                "payment_settlement_date": record['payment_settlement_date'],
                "creditor_direct_agent": record['creditor_direct_agent'],
                "payment_method": record['payment_method'],
                "transfers": [
                    {
                        "debtor_client": record['debtor_client'],
                        "debtor_client_account": int(record['debtor_client_account']),
                        "creditor_agent_account": record['creditor_agent_account'],
                        "creditor_client": record['creditor_client'],
                        "creditor_client_account": record['creditor_client_account'],
                        "transfer_amount": record['transfer_amount']
                    }
                ]
            }
        # print(data['payment_reference'])
        status, message = sanpay.create_payment(data=data)
        print(status, message)
        if status:
            raw_query = f'UPDATE [Issue Ledger Out] SET [is_sanpay] = \'Y\' WHERE [Trans_No] = \''+ str(data['payment_reference']) + '\''
            with connection.cursor() as cursor:
               cursor.execute(raw_query)
        
    return f"Pushed {len(new_records)} records and marked them as sent."

@shared_task
def process_new_payment(payment_id):
    # print('processing payment id:' + str(payment_id))
    status, message = sanpay.process_payment(payment_id=payment_id)
    # print(status, message)