from django.urls import path
from .views import API


urlpatterns = [
    path("security_mtb_maturity/", API.as_view()),
]
