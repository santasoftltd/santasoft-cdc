import json
from datetime import datetime
from config.settings import RTGS_LOG_PATH, LOG_PATH, DEBUG
import os, os.path


def InternalCallLogging(response, exception, purpose):
    SERVICE_LOG_PATH = LOG_PATH + purpose + '.txt'
    os.makedirs(os.path.dirname(SERVICE_LOG_PATH), exist_ok=True)
    try:
        if response.request.method in ('POST', 'PUT') and DEBUG == True:
            if exception == None:
                with open(SERVICE_LOG_PATH, "a") as file:
                    file.writelines(f"\nTime: {datetime.now()}, URL: {response.url}, Method: {response.request.method}, Headers: {response.headers}, Request Body: {response.request.body}, "
                    f"Respond Status: {response.status_code}, Respond Body: {response.content}\n")
            else:
                with open(SERVICE_LOG_PATH, "a") as file:
                    file.writelines(f"\nTime: {datetime.now()}, URL: {response.url}, Method: {response.request.method}, Headers: {response.headers}, Request Body: {response.request.body}, "
                    f"Respond Status: {response.status_code}, Exception: {exception}\n")
        elif response.request.method in ('POST', 'PUT') and DEBUG == False:
            if exception == None:
                with open(SERVICE_LOG_PATH, "a") as file:
                    file.writelines(f"\nTime: {datetime.now()}, URL: {response.url}, Method: {response.request.method}, Headers: {response.headers}, Request Body: {response.request.body}, "
                    f"Respond Status: {response.status_code}, Respond Body: NONE\n")
            else:
                with open(SERVICE_LOG_PATH, "a") as file:
                    file.writelines(f"\nTime: {datetime.now()}, URL: {response.url}, Method: {response.request.method}, Headers: {response.headers}, Request Body: {response.request.body}, "
                    f"Respond Status: {response.status_code}, Exception: {exception}\n")
        else:
            if exception == None:
                with open(SERVICE_LOG_PATH, "a") as file:
                    file.writelines(f"\nTime: {datetime.now()}, URL: {response.url}, Method: {response.request.method}, Headers: {response.headers}, Request Body: NONE, "
                    f"Respond Status: {response.status_code}, Respond Body: {response.content}\n")
            else:
                with open(SERVICE_LOG_PATH, "a") as file:
                    file.writelines(f"\nTime: {datetime.now()}, URL: {response.url}, Method: {response.request.method}, Headers: {response.headers}, Request Body: NONE, "
                    f"Respond Status: {response.status_code}, Exception: {exception}\n")
    except:
        with open(SERVICE_LOG_PATH, "a") as file:
                    file.writelines(f"\nTime: {datetime.now()}, Exception: {exception}\n")

def RtgsInternalCallLogging(response, exception, reference):
    date = datetime.now()
    RTGS_SERVICE_LOG_PATH = RTGS_LOG_PATH + date.strftime("%Y") + '/' + date.strftime("%B") + '/' + date.strftime("%d") + '/' + reference + '.txt'
    os.makedirs(os.path.dirname(RTGS_SERVICE_LOG_PATH), exist_ok=True)
    try:
        if response.request.method in ('POST', 'PUT') and DEBUG == True:
            if exception == None:
                with open(RTGS_SERVICE_LOG_PATH, "a") as file:
                    file.writelines(f"\nTime: {datetime.now()}, URL: {response.url}, Method: {response.request.method}, Headers: {response.headers}, Request Body: {response.request.body}, "
                    f"Respond Status: {response.status_code}, Respond Body: {response.content}\n")
            else:
                with open(RTGS_SERVICE_LOG_PATH, "a") as file:
                    file.writelines(f"\nTime: {datetime.now()}, URL: {response.url}, Method: {response.request.method}, Headers: {response.headers}, Request Body: {response.request.body}, "
                    f"Respond Status: {response.status_code}, Exception: {exception}\n")
        elif response.request.method in ('POST', 'PUT') and DEBUG == False:
            if exception == None:
                with open(RTGS_SERVICE_LOG_PATH, "a") as file:
                    file.writelines(f"\nTime: {datetime.now()}, URL: {response.url}, Method: {response.request.method}, Headers: {response.headers}, Request Body: {response.request.body}, "
                    f"Respond Status: {response.status_code}, Respond Body: NONE\n")
            else:
                with open(RTGS_SERVICE_LOG_PATH, "a") as file:
                    file.writelines(f"\nTime: {datetime.now()}, URL: {response.url}, Method: {response.request.method}, Headers: {response.headers}, Request Body: {response.request.body}, "
                    f"Respond Status: {response.status_code}, Exception: {exception}\n")
        else:
            if exception == None:
                with open(RTGS_SERVICE_LOG_PATH, "a") as file:
                    file.writelines(f"\nTime: {datetime.now()}, URL: {response.url}, Method: {response.request.method}, Headers: {response.headers}, Request Body: NONE, "
                    f"Respond Status: {response.status_code}, Respond Body: {response.content}\n")
            else:
                with open(RTGS_SERVICE_LOG_PATH, "a") as file:
                    file.writelines(f"\nTime: {datetime.now()}, URL: {response.url}, Method: {response.request.method}, Headers: {response.headers}, Request Body: NONE, "
                    f"Respond Status: {response.status_code}, Exception: {exception}\n")
    except:
        with open(RTGS_SERVICE_LOG_PATH, "a") as file:
                    file.writelines(f"\nTime: {datetime.now()}, Exception: {exception}\n")
