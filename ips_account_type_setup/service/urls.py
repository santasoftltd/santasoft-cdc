from django.urls import path
from .views import API


urlpatterns = [
    path("ips_account_type_setup/", API.as_view()),
]
