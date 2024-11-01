from django.urls import path
from .views import register, login, logout, authenticate_token

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('authenticate_token/', authenticate_token, name="authenticate_token")
]