from django.urls import path
from .views import API


urlpatterns = [
    path("fms_cash_transaction/", API.as_view()),
]
