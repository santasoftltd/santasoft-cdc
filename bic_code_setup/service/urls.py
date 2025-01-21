from django.urls import path
from .views import API


urlpatterns = [
    path("bic_code_setup/", API.as_view()),
]
