from django.urls import path, include
import service.sanpay_rtgs as sanpay_rtgs


urlpatterns = [
    path('service/', include('service.urls')),
]

sanpay_rtgs.generate_client_token()