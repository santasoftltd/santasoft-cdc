from django.urls import path
from .views import API


urlpatterns = [
    path("fms_security_transaction/", API.as_view()),
]
