from django.urls import path
from .views import API


urlpatterns = [
    path("sanpay/", API.as_view()),
]
