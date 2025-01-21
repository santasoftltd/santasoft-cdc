from django.urls import path
from .views import API


urlpatterns = [
    path("ips_registry/", API.as_view()),
]
