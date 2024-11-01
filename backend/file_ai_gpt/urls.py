from django.urls import path
from .views import xl_request, pdf_request, pdf_content_request

urlpatterns = [
    path('xl_request/', xl_request, name='xl_gen_request'),
    path('pdf_request/', pdf_request, name='pdf_gen_request'),
    path('pdf_content_request/', pdf_content_request, name='pdf_content_request')   
]