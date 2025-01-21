from django.urls import path
from .views import input_api, token_api


urlpatterns = [
    path("input", input_api.as_view()),
    path("token", token_api.as_view()),
]
