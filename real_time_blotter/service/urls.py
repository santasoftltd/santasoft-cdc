from django.urls import path
from .views import API


urlpatterns = [
    path("real_time_blotter/", API.as_view()),
]
