from django.urls import path
from .views import API


urlpatterns = [
    path("security_principle_maturity/", API.as_view()),
]
