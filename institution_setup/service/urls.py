from django.urls import path
from .views import API


urlpatterns = [
    path("institution_setup/", API.as_view()),
]
