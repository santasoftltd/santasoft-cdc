from django.urls import path
from .views import API


urlpatterns = [
    path("cash_transaction/", API.as_view()),
]
