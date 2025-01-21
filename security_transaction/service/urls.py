from django.urls import path
from .views import API


urlpatterns = [
    path("security_transaction/", API.as_view()),
]
