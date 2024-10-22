from django.urls import path
from .views import xl_request, pdf_request

urlpatterns = [
    path('xl_request/', xl_request, name='xl_gpt_request'),
    path('pdf_request/', pdf_request, name='pdf_gpt_request'),
]