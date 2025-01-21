from django.urls import path
from .views import API


urlpatterns = [
    path("security_coupon_maturity/", API.as_view()),
]
