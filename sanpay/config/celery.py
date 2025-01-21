from __future__ import absolute_import, unicode_literals
import os

from celery import Celery
from django.conf import settings
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('config')

app.config_from_object(settings, namespace='CELERY')

# Add periodic task configuration
app.conf.beat_schedule = {
    'push-new-payments-every-30-seconds': {
        'task': 'service.celery_tasks.push_new_payments',
        'schedule': 30.0,  # Run every 30 seconds
    },
}

# Celery Schedules - https://docs.celeryproject.org/en/stable/reference/celery.schedules.html

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')