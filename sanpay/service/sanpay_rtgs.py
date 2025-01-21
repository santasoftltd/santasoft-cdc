from .models.SanpayTransferDetail import SanpayTransferDetail
import service.messages.pacs008_SCCT_DP_A_DP_B as pacs008_SCCT_DP_A_DP_B
import service.messages.pacs008_MCCT_DP_A_DP_B as pacs008_MCCT_DP_A_DP_B
import service.messages.pacs008_FICT_DP_A_DP_B as pacs008_FICT_DP_A_DP_B
import requests
from django.conf import settings
from datetime import datetime
import jwt
import time
import config.logging as logging


def prepare_message_document(payment_instance):
    try:
        document = ''
        if payment_instance.payment_method == 'RTGS-SCCT':
            transfer_instance = SanpayTransferDetail.objects.get(payment_id = payment_instance.payment_id)
            details = {
                'Instructing_Agent': payment_instance.debtor_direct_agent,
                'Instructed_Agent': payment_instance.creditor_direct_agent,
                'Message_Reference': payment_instance.payment_reference,
                'Message_Creation_Timestamp': payment_instance.payment_creation_timestamp,
                'Payment_Priority': payment_instance.payment_priority,
                'Transaction_Reference': transfer_instance.transfer_reference,
                'Settlement_Amount': transfer_instance.transfer_amount,
                'Settlement_Date': payment_instance.payment_settlement_date,
                'Charges_bearer': transfer_instance.charges_bearer,
                'Debtor_Agent': transfer_instance.debtor_agent,
                'Debtor_Client': transfer_instance.debtor_client,
                'Debtor_Client_Account': transfer_instance.debtor_client_account,
                'Creditor_Agent': transfer_instance.creditor_agent,
                'Creditor_Client': transfer_instance.creditor_client,
                'Creditor_Client_Account': transfer_instance.creditor_client_account,
            }
            document = pacs008_SCCT_DP_A_DP_B.get_document(details)
        elif payment_instance.payment_method == 'RTGS-MCCT':
            transfer_instance = SanpayTransferDetail.objects.filter(payment_id = payment_instance.payment_id)
            transfers = []
            for item in transfer_instance:
                transfers.append({
                    'Message_Reference': item.transfer_reference,
                    'Transaction_Reference': payment_instance.payment_reference + '//' + item.transfer_reference,
                    'Settlement_Amount': item.transfer_amount,
                    'Charges_bearer': item.charges_bearer,
                    'Debtor_Agent': item.debtor_agent,
                    'Debtor_Client': item.debtor_client,
                    'Debtor_Client_Account': item.debtor_client_account,
                    'Creditor_Agent': item.creditor_agent,
                    'Creditor_Client': item.creditor_client,
                    'Creditor_Client_Account': item.creditor_client_account,
                })
            details = {
                'Instructing_Agent': payment_instance.debtor_direct_agent,
                'Instructed_Agent': payment_instance.creditor_direct_agent,
                'Message_Reference': payment_instance.payment_reference,
                'Message_Creation_Timestamp': payment_instance.payment_creation_timestamp,
                'Payment_Priority': payment_instance.payment_priority,
                'No_of_Settlement': payment_instance.no_of_transfers,
                'Total_Settlement_Amount': payment_instance.total_payment_amount,
                'Settlement_Date': payment_instance.payment_settlement_date,
                'Settlements': transfers
            }
            document = pacs008_MCCT_DP_A_DP_B.get_document(details)
        elif payment_instance.payment_method == 'RTGS-FICT':
            transfer_instance = SanpayTransferDetail.objects.get(payment_id = payment_instance.payment_id)
            details = {
                'Instructing_Agent': payment_instance.debtor_direct_agent,
                'Instructed_Agent': payment_instance.creditor_direct_agent,
                'Message_Reference': payment_instance.payment_reference,
                'Message_Creation_Timestamp': payment_instance.payment_creation_timestamp,
                'Payment_Priority': payment_instance.payment_priority,
                'Transaction_Reference': transfer_instance.transfer_reference,
                'Settlement_Amount': transfer_instance.transfer_amount,
                'Settlement_Date': payment_instance.payment_settlement_date,
                'Charges_bearer': transfer_instance.charges_bearer,
                'Debtor_Agent': transfer_instance.debtor_agent,	
                'Creditor_Agent': transfer_instance.creditor_agent,
            }
            document = pacs008_FICT_DP_A_DP_B.get_document(details)

        return True, document
    except Exception as e:
        return False, str(e)
    
def sign_message_document(document):
    pass

def prepare_message_data(signature, document, payment_instance):
    message = f'''
        <?xml version="1.0" encoding="UTF-8"?>
		<DataPDU xmlns="urn:cma:stp:xsd:stp.1.0">
			<Body>
				<!-- Application header -->
				<AppHdr xmlns="urn:iso:std:iso:20022:tech:xsd:head.001.001.02">
					<!-- Message Sender: -->
					<Fr>
						<FIId>
							<FinInstnId>
								<BICFI>{payment_instance.debtor_direct_agent}</BICFI>
							</FinInstnId>
						</FIId>
					</Fr>
					<!-- Message Receiver -->
					<To>
						<FIId>
							<FinInstnId>
								<BICFI>{payment_instance.creditor_direct_agent}</BICFI>
							</FinInstnId>
						</FIId>
					</To>
					<!-- Message Reference -->
					<BizMsgIdr>{payment_instance.payment_reference}</BizMsgIdr>
					<!-- Message Type -->
					<MsgDefIdr>pacs.008.001.08</MsgDefIdr>
					<!-- Business Service -->
					<BizSvc>sbp.rtgs.01</BizSvc>
					<!-- Message Creation Date/Time-->
					<CreDt>{payment_instance.payment_creation_timestamp}</CreDt>
					<!--Payment priority-->
					<Prty>{payment_instance.payment_priority}</Prty>
                    <!--Signature-->
                    <Sgntr>
                        {signature}
                    </Sgntr>
				</AppHdr>
                {document}
            </Body>
		</DataPDU>
    '''
    return message

def post_message(message, payment_instance):
    try:
        if settings.RTGS_ACCESS_TOKEN == None:
            request_access_token()

        # Define request headers
        headers = {
            "X-Timestamp": str(datetime.now()),
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {settings.RTGS_ACCESS_TOKEN}",
            "Host": settings.RTGS_POST_MESSAGE_IP
        }

        # Define request payload
        payload = {
            "traceReference": payment_instance.payment_reference,
            "service": "M",
            "type": "pacs.008.001.08",
            "sender": payment_instance.debtor_direct_agent,
            "receiver": payment_instance.creditor_direct_agent,
            "document": message
        }

        # The API endpoint to communicate with
        url_post = settings.RTGS_POST_MESSAGE_URL

        # A POST request to tthe API
        response  = requests.post(url_post, headers=headers, json=payload)

        if response.status_code == 200:
            pass
        elif response.status_code == 400:
            pass
        elif response.status_code == 401:
            request_access_token()
        print('Calling rtgs internal')
        logging.RtgsInternalCallLogging(response, None, payment_instance.payment_reference)
    except Exception as e:
        logging.RtgsInternalCallLogging(None, e, payment_instance.payment_reference)
    # print(response.status_code)
    # print(response.request.headers)
    # print(response.request.body)

    # # Print the response
    # post_response_json = response .json()
    # print(post_response_json)

def check_client_token():
    if settings.JWT_PAYLOAD == None:
        generate_client_token()
    else:
        jwt = settings.JWT_PAYLOAD
        if jwt['exp'] < time.time():
            print("JWT expired, generating a new one")
            generate_client_token()

def generate_client_token():
    payload = {
        "iss": settings.DEBTOR_DIRECT_AGENT,  # Client ID
        "iat": int(time.time()),  # Current timestamp
        "exp": int(time.time()) + 604800,  # Expires in 7 days
        "asrv_type": "client",
        "asrv_cert_iss": settings.RTGS_CERTIFICATE_ISSUER,
        "asrv_cert_sn": settings.RTGS_CERTIFICATE_SERIAL_NUMBER
    }

    # Private key for signing the JWT (should be securely stored)
    private_key = settings.RTGS_CERTIFICATE_PRIVATE_KEY

    settings.RTGS_CLEINT_TOKEN = jwt.encode(payload, private_key, algorithm="HS256")
    settings.JWT_PAYLOAD = payload

    # print(settings.JWT_PAYLOAD)

    # print(settings.RTGS_CLEINT_TOKEN)

def request_access_token():
    try:
        # check if the clinet token is valid
        check_client_token()

        # Define request headers
        headers = {
            "X-Timestamp": str(datetime.now()),
            "Accept": "application/json",
            "Authorization": f"Bearer {settings.RTGS_CLEINT_TOKEN}",
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": settings.RTGS_ACCESS_TOKEN_IP
        }

        data = {
            'grant_type': 'password',  # Set the grant type to 'password'
            'username': settings.DEBTOR_DIRECT_AGENT,  # Replace with your actual username
            'password': 'your_password'   # Replace with your actual password
        }

        # The API endpoint to communicate with
        url_post = settings.RTGS_ACCESS_TOKEN_URL

        # A POST request to tthe API
        response  = requests.post(url_post, headers=headers, data=data)

        if response.status_code == 200:
            # Parse the JSON response
            token_response = response.json()
            # Access the access token from the response
            settings.RTGS_ACCESS_TOKEN = token_response.get('access_token')
            print(settings.RTGS_ACCESS_TOKEN)
        elif response.status_code == 420:
            pass
            # update_password()
        else:
            print(f"Failed to get token. Status code: {response.status_code}")
            print("Response:", response.text)
        logging.InternalCallLogging(response, None, 'access_token')
    except Exception as e:
        logging.InternalCallLogging(None, e, None, 'access_token')

def update_password(new_password):
    try:
        # check if the clinet token is valid
        check_client_token()

        # Define request headers
        headers = {
            "X-Timestamp": str(datetime.now()),
            "Accept": "application/json",
            "Authorization": f"Bearer {settings.RTGS_CLEINT_TOKEN}",
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": settings.RTGS_ACCESS_TOKEN_IP
        }

        data = {
            'new_pwd': new_password,  # Replace with your actual username
            'current_pwd': 'your_password'   # Replace with your actual password
        }

        # The API endpoint to communicate with
        url_post = settings.RTGS_UPDATE_PASSWORD_URL

        # A POST request to tthe API
        response  = requests.post(url_post, headers=headers, data=data)

        if response.status_code == 200:
            pass
        elif response.status_code == 420:
            update_password()
        else:
            print(f"Failed to get token. Status code: {response.status_code}")
            print("Response:", response.text)
        logging.InternalCallLogging(response, None, 'update_password')
    except Exception as e:
        logging.InternalCallLogging(None, e, None, 'update_password')
