from django.urls import path
from .views import API


urlpatterns = [
    path("security_issue_setup/", API.as_view()),
]
