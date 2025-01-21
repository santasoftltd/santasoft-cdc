from django.urls import path
from .views import API


urlpatterns = [
    path("cash_transaction_type_setup/", API.as_view()),
]
