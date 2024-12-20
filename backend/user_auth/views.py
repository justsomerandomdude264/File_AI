from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator
from django.utils import timezone

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import AuthSerializer
from .models import Auth, UserTokenAuth
from .helpers import send_email_otp, send_otp_phone

from typing import NoReturn
import re
import hashlib
import secrets
import logging


logger = logging.getLogger(__name__)

'''Helper Functions'''

# Centralized validation functions
def validate_email(email: str) -> NoReturn:
    """Validate email format and length."""
    if len(email) < 3 or len(email) > 255:
        raise ValidationError("Email must be between 3 and 255 characters.")
    EmailValidator()(email)

def validate_username(username: str) -> NoReturn:
    """Validate username length."""
    if len(username) < 3 or len(username) > 255:
        raise ValidationError("Username must be between 3 and 255 characters.")

def validate_password(password: str) -> NoReturn:
    """Validate password length."""
    if len(password) < 6:
        raise ValidationError("Password must be at least 6 characters long.")

def validate_phone_number(phoneno: str) -> NoReturn:
    """Validate phone number format."""
    if not re.match(r'^\+?1?\d{9,15}$', phoneno):
        raise ValidationError("Invalid phone number format.")

# Text to SHA256 hash
def encrypt_sha256(text: str) -> str:
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

# Exception handler decorator
def handle_exceptions(func):
    """Decorator to handle exceptions gracefully and log errors."""
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ValidationError as e:
            logger.error(f"Validation Error: {e}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.exception("Unexpected error occurred")
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return wrapper

'''API Views'''

@api_view(['POST'])
@handle_exceptions
def register(request):
    """Handle user registration."""
    email = request.data.get('email', '').strip()
    username = request.data.get('username', '').strip()
    password = request.data.get('password', '').strip()
    phoneno = request.data.get('phoneno', '').strip()

    validate_email(email)
    validate_username(username)
    validate_password(password)
    validate_phone_number(phoneno)

    if Auth.objects.filter(email=email).exists():
        raise ValidationError("Email is already registered.")
    if Auth.objects.filter(username=username).exists():
        raise ValidationError("Username is already taken.")
    if Auth.objects.filter(phone_no=phoneno).exists():
        raise ValidationError("Phone number is already registered.")

    hashed_password = encrypt_sha256(password)

    data = {
        'email': email,
        'username': username,
        'passwordhash': hashed_password,
        'phone_no': phoneno
    }

    serializer = AuthSerializer(data=data)

    if not serializer.is_valid():
        logger.error(f"Serialization Error: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    user = serializer.save()

    # Generate a token for the user
    token_obj = UserTokenAuth.objects.create(
        token=secrets.token_urlsafe(20),
        user=user,
        request_count=0,
        last_request_date=None,
        created=timezone.now()
    )

    return Response({"token": token_obj.token}, status=status.HTTP_201_CREATED)
        

@api_view(['POST'])
@handle_exceptions
def login(request):
    """Handle user login."""
    email = request.data.get('email', '').strip()
    password = request.data.get('password', '').strip()

    if not email or not password:
        raise ValidationError("Email and password are required.")

    validate_email(email)
    validate_password(password)

    hashed_password = encrypt_sha256(password)

    try:
        user = Auth.objects.get(email=email)
        if user.passwordhash != hashed_password:
            raise ValidationError("Invalid credentials.")

        # Generate or retrieve the user's token
        token_obj, _created = UserTokenAuth.objects.get_or_create(
            user=user,
            defaults={
                'token': secrets.token_urlsafe(20),
                'request_count': 0,
                'last_request_date': None,
                'created': timezone.now()
            }
        )

        return Response({"token": token_obj.token}, status=status.HTTP_202_ACCEPTED)
    except Auth.DoesNotExist:
        # If user does not exist return error
        raise ValidationError("Invalid credentials.")

@api_view(['POST'])
@handle_exceptions
def logout(request):
    """Handle user logout by invalidating the token."""
    token = request.data.get("token", "").strip()

    if not token:
        raise ValidationError("Token is required.")

    try:
        token_obj = UserTokenAuth.objects.get(token=token)
        token_obj.delete()
        return Response({"message": "Token deleted successfully."}, status=status.HTTP_200_OK)
    except UserTokenAuth.DoesNotExist:
        raise ValidationError("Invalid token.")

@api_view(['DELETE'])
@handle_exceptions
def delete_account(request):
    token = request.data.get("token", "").strip()

    if not token:
        raise ValidationError("Token is required.")

    try:
        token_obj = UserTokenAuth.objects.get(token=token)
        user = token_obj.user
        user.delete()
        return Response({"message": "Account deleted successfully."}, status=status.HTTP_200_OK)
    except UserTokenAuth.DoesNotExist:
        raise ValidationError("Invalid token.")

@api_view(['POST'])
@handle_exceptions
def authenticate_token(request):
    """Verify if the provided token is valid and return user data."""
    token = request.data.get("token", "").strip()

    if not token:
        raise ValidationError("Token is required.")

    try:
        token_obj = UserTokenAuth.objects.get(token=token)
        user = token_obj.user
        return Response({"username": user.username, "email": user.email}, status=status.HTTP_200_OK)
    except UserTokenAuth.DoesNotExist:
        raise ValidationError("Invalid token.")

@api_view(['POST'])
@handle_exceptions
def send_otp_email(request):
    """Send an OTP to the user's email."""
    token = request.data.get('token', '').strip()

    if not token:
        raise ValidationError("Token is required.")

    try:
        token_obj = UserTokenAuth.objects.get(token=token)
    except UserTokenAuth.DoesNotExist:
        raise ValidationError("Invalid token.")

    email = token_obj.user.email

    otp = 1234567 #send_email_otp(email)

    token_obj.otp = otp
    token_obj.save()

    return Response({"message": f"OTP successfully sent to {email}"}, status=status.HTTP_200_OK)

@api_view(['POST'])
@handle_exceptions
def send_otp_phoneno(request):
    """Send an OTP to the user's phone number."""
    token = request.data.get("token", "").strip()

    if not token:
        raise ValidationError("Token is required.")

    try:
        token_obj = UserTokenAuth.objects.get(token=token)
    except UserTokenAuth.DoesNotExist:
        raise ValidationError("Invalid token.")

    phone_no = token_obj.user.phone_no

    otp = 1234567 #send_otp_phone(phone_no)

    token_obj.otp = otp
    token_obj.save()

    return Response({"message": f"OTP successfully sent to {phone_no}"}, status=status.HTTP_200_OK)

@api_view(['POST'])
@handle_exceptions
def check_otp(request):
    """Validate the provided OTP."""
    token = request.data.get("token", "").strip()
    otp = request.data.get("otp", "").strip()
    otp_type = request.data.get("otp_type", "").strip()

    try:
        otp = int(otp)
    except:
        raise ValidationError("OPT must be an int.")

    if not token:
        raise ValidationError("Token is required.")
    if not otp:
        raise ValidationError("OTP is required.")
    if not otp_type:
        raise ValidationError("OTP Type is required.")

    try:
        token_obj = UserTokenAuth.objects.get(token=token)
    except UserTokenAuth.DoesNotExist:
        raise ValidationError("Invalid token.")

    true_otp = token_obj.otp

    if not true_otp:
        raise ValidationError("Send OTP first, no OTP found.")

    if true_otp == otp:
        token_obj.otp = None
        if otp_type == 'email':
            token_obj.email_verified = True
        elif otp_type == 'phone':
            token_obj.phone_verified = True
        else:
            raise ValidationError("OTP Type must be 'phone' or 'email'.")
        token_obj.save()
        return Response({"message": "OTP verified successfully."}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Invalid OTP."}, status=status.HTTP_401_UNAUTHORIZED)