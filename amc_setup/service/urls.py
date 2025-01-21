from django.urls import path
from .views import API


urlpatterns = [
    path("amc_setup/", API.as_view()),
]
