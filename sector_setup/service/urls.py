from django.urls import path
from .views import API


urlpatterns = [
    path("sector_setup/", API.as_view()),
]
