from django.urls import path
from .views import register, login, logout, delete_account, authenticate_token, send_otp_email, send_otp_phoneno, check_otp

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('authenticate_token/', authenticate_token, name="authenticate_token"),
    path('send_otp_email/', send_otp_email, name='send_otp_email'),
    path('send_otp_phoneno/', send_otp_phoneno, name='send_otp_phoneno'),
    path('check_otp/', check_otp, name='check_otp'),
    path('delete_account/', delete_account, name='delete_account')
]