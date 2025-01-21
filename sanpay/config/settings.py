from pathlib import Path
from decouple import Config, RepositoryEnv
import os

# Load configuration from an external file
config = Config(RepositoryEnv(os.environ['CDC_CONFIG_FILE']))

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(config("DEBUG"))

ALLOWED_HOSTS = [config('HOST_IP')]


# Application definition

INSTALLED_APPS = [
    # 'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    # 'django.contrib.sessions',
    'django.contrib.messages',
    # 'django.contrib.staticfiles',
    'service',
    'django_celery_beat',
]

MIDDLEWARE = [
    # 'django.middleware.security.SecurityMiddleware',
    # 'django.contrib.sessions.middleware.SessionMiddleware',
    # 'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    # 'django.contrib.auth.middleware.AuthenticationMiddleware',
    # 'django.contrib.messages.middleware.MessageMiddleware',
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    # {
    #     'BACKEND': 'django.template.backends.django.DjangoTemplates',
    #     'DIRS': [],
    #     'APP_DIRS': True,
    #     'OPTIONS': {
    #         'context_processors': [
    #             'django.template.context_processors.debug',
    #             'django.template.context_processors.request',
    #             'django.contrib.auth.context_processors.auth',
    #             'django.contrib.messages.context_processors.messages',
    #         ],
    #     },
    # },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": config('DB_ENGINE'),
        "NAME": config('DB_NAME'),
        "USER": config('DB_USER'),
        "PASSWORD": config('DB_PASSWORD'),
        "HOST": config('DB_HOST_IP'),
        "PORT": config('DB_HOST_PORT'),
        "OPTIONS": {
            'Trusted_Connection':'yes',
            "driver": "ODBC Driver 17 for SQL Server",
        },
    },
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    # {
    #     'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    # },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    # },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    # },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    # },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# RTGS SETTINGS

PAYMENT_METHODS = ['RTGS-SCCT', 'RTGS-MCCT', 'RTGS-FICT']

RTGS_PAYMENT_METHODS = ['RTGS-SCCT', 'RTGS-MCCT', 'RTGS-FICT']

DEBTOR_DIRECT_AGENT = config('CDC_BIC_CODE')

DEBTOR_DIRECT_AGENT_ACCOUNT = config('CDC_ACCOUNT_NUMBER')

PAYMENT_PRIORITY = '0010'

PAYMENT_TRANSFER_CHARGES_BEARER = 'SHAR'

PAYMENT_TRANSFER_CURRENCY = 'PKR'

RTGS_ACCESS_TOKEN = None

RTGS_CLEINT_TOKEN = None

JWT_PAYLOAD = None

RTGS_POST_MESSAGE_IP = config('RTGS_POST_MESSAGE_IP')

RTGS_ACCESS_TOKEN_IP = config('RTGS_ACCESS_TOKEN_IP')

RTGS_UPDATE_PASSWORD_IP = config('RTGS_UPDATE_PASSWORD_IP')

RTGS_POST_MESSAGE_URL = config('RTGS_POST_MESSAGE_URL')

RTGS_ACCESS_TOKEN_URL = config('RTGS_ACCESS_TOKEN_URL')

RTGS_UPDATE_PASSWORD_URL = config('RTGS_UPDATE_PASSWORD_URL')

RTGS_CERTIFICATE_ISSUER = config('RTGS_CERTIFICATE_ISSUER')

RTGS_CERTIFICATE_SERIAL_NUMBER = config('RTGS_CERTIFICATE_SERIAL_NUMBER')

RTGS_CERTIFICATE_PRIVATE_KEY = b"-----BEGIN PRIVATE KEY-----\nMIGEAgEAMBAGByqGSM49AgEGBS..."

# CELERY SETTINGS

CELERY_BROKER_URL = config('CELERY_BROKER_URL')
ACCEPT_CONTENT = ['application/json']
RESULT_SERIALIZER = 'json'
TASK_SERIALIZER = 'json'

# RTGS Log Path

RTGS_LOG_PATH = config('RTGS_LOG_PATH')

LOG_PATH = config('LOG_PATH')
