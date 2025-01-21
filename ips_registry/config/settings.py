from pathlib import Path
import os

# CONFIG VARAIBLES
VARAIBLE_DEBUG = None
VARAIBLE_DB_ENGINE = None
VARAIBLE_DB_NAME = None
VARAIBLE_DB_USER = None
VARAIBLE_DB_PASSWORD = None
VARAIBLE_DB_HOST_IP = None
VARAIBLE_DB_HOST_PORT = None

ENVIRONMENT = os.environ['environment']
print(ENVIRONMENT)

if ENVIRONMENT == 'development':
    VARAIBLE_DEBUG = True
    VARAIBLE_DB_ENGINE = 'mssql'
    VARAIBLE_DB_NAME = 'DVIPSPRO'
    VARAIBLE_DB_USER = 'test3'
    VARAIBLE_DB_PASSWORD = 'test3'
    VARAIBLE_DB_HOST_IP = '192.168.56.1'
    VARAIBLE_DB_HOST_PORT = '4242'
    VARAIBLE_CELERY_BROKER_URL = 'redis://redis:6379/0'

if ENVIRONMENT == 'UAT':
    VARAIBLE_DEBUG = True
    VARAIBLE_DB_ENGINE = 'mssql'
    VARAIBLE_DB_NAME = 'DVIPSPRO'
    VARAIBLE_DB_USER = 'ips_uat'
    VARAIBLE_DB_PASSWORD = 'abc123*++'
    VARAIBLE_DB_HOST_IP = '10.2.145.182'
    VARAIBLE_DB_HOST_PORT = '1490'
    VARAIBLE_CELERY_BROKER_URL = 'redis://redis:6379/0'

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-oezw9k$_s4ob-xhu2)(eewr2gcw4e(wjgir=h&8!pmih+=9py5'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1']


# Application definition

INSTALLED_APPS = [
    # 'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    # 'django.contrib.sessions',
    'django.contrib.messages',
    # 'django.contrib.staticfiles',
    'service',
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
        "ENGINE": VARAIBLE_DB_ENGINE,
        "NAME": VARAIBLE_DB_NAME,
        "USER": VARAIBLE_DB_USER,
        "PASSWORD": VARAIBLE_DB_PASSWORD,
        "HOST": VARAIBLE_DB_HOST_IP,
        "PORT": VARAIBLE_DB_HOST_PORT,
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
