from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import AuthSerializer
from .models import Auth, UserTokenAuth
from .helpers import send_email_otp, send_otp_phone
import re
import hashlib
import secrets
import logging
import os


logger = logging.getLogger(__name__)

# Utility Functions

def validate_email(email: str):
    """Validate email format and length."""
    if len(email) < 3 or len(email) > 255:
        raise ValidationError("Email must be between 3 and 255 characters.")
    EmailValidator()(email)

def validate_username(username: str):
    """Validate username length."""
    if len(username) < 3 or len(username) > 255:
        raise ValidationError("Username must be between 3 and 255 characters.")

def validate_password(password: str):
    """Validate password length."""
    if len(password) < 6:
        raise ValidationError("Password must be at least 6 characters long.")

def validate_phone_number(phoneno: str):
    """Validate phone number format."""
    if not re.match(r'^\+?1?\d{9,15}$', phoneno):
        raise ValidationError("Invalid phone number format.")

def encrypt_sha256(text: str) -> str:
    """Convert text into SHA256 hash."""
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

# API Views

@api_view(['POST'])
def register(request):
    """
    Handle user registration.

    Checks the validity of all entries,
    Checks uniqueness,
    Makes the Auth object and
    also make the Token Object.
    """
    email = request.data.get('email', '').strip()
    username = request.data.get('username', '').strip()
    password = request.data.get('password', '').strip()
    phoneno = request.data.get('phoneno', '').strip()

    try:
        validate_email(email)
        validate_username(username)
        validate_password(password)
        validate_phone_number(phoneno)

        if Auth.objects.filter(email=email).exists():
            return Response({"error": "Email is already registered."}, status=status.HTTP_400_BAD_REQUEST)
        if Auth.objects.filter(username=username).exists():
            return Response({"error": "Username is already taken."}, status=status.HTTP_400_BAD_REQUEST)
        if Auth.objects.filter(phone_no=phoneno).exists():
            return Response({"error": "Phone number is already registered."}, status=status.HTTP_400_BAD_REQUEST)

        hashed_password = encrypt_sha256(password)
        data = {'email': email, 'username': username, 'passwordhash': hashed_password, 'phone_no': phoneno}
        serializer = AuthSerializer(data=data)

        if serializer.is_valid():
            user = serializer.save()
            token_obj = UserTokenAuth.objects.create(token=secrets.token_urlsafe(20), user=user, request_count=0, last_request_date=None, created=timezone.now())
            return Response({"token": token_obj.token}, status=status.HTTP_201_CREATED)
        else:
            logger.error(f"Serialization Error: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except ValidationError as e:
        logger.error(f"Validation Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.exception("Unexpected error occurred")
        return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def login(request):
    """
    Handles user login.

    Checks authenticity of data,
    Logs the user in and return the token of the respective user.
    """
    email = request.data.get('email', '').strip()
    password = request.data.get('password', '').strip()

    try:
        if not email or not password:
            return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        validate_email(email)
        validate_password(password)

        hashed_password = encrypt_sha256(password)
        user = Auth.objects.get(email=email)

        if user.passwordhash != hashed_password:
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

        token_obj, _ = UserTokenAuth.objects.get_or_create(user=user, defaults={'token': secrets.token_urlsafe(20), 'request_count': 0, 'last_request_date': None, 'created': timezone.now()})
        return Response({"token": token_obj.token}, status=status.HTTP_202_ACCEPTED)

    except ValidationError as e:
        logger.error(f"Validation Error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Auth.DoesNotExist:
        return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        logger.exception("Unexpected error occurred")
        return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def logout(request):
    """Logs the user out, deleting the user token."""
    token = request.data.get("token", "").strip()
    try:
        if not token:
            return Response({"error": "Token is required."}, status=status.HTTP_400_BAD_REQUEST)

        token_obj = UserTokenAuth.objects.get(token=token)
        token_obj.delete()
        return Response({"message": "Token deleted successfully."}, status=status.HTTP_200_OK)

    except UserTokenAuth.DoesNotExist:
        return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.exception("Unexpected error occurred")
        return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def delete_account(request):
    """Handles user's account deletion."""
    token = request.data.get("token", "").strip()
    try:
        if not token:
            return Response({"error": "Token is required."}, status=status.HTTP_400_BAD_REQUEST)

        token_obj = UserTokenAuth.objects.get(token=token)
        user = token_obj.user
        user.delete()
        return Response({"message": "Account deleted successfully."}, status=status.HTTP_200_OK)

    except UserTokenAuth.DoesNotExist:
        return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.exception("Unexpected error occurred")
        return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def authenticate_token(request):
    """Checks if the provived token is valid and return the respective user data."""
    token = request.data.get("token", "").strip()
    try:
        if not token:
            return Response({"error": "Token is required."}, status=status.HTTP_400_BAD_REQUEST)

        token_obj = UserTokenAuth.objects.get(token=token)
        user = token_obj.user
        return Response({"username": user.username, "email": user.email}, status=status.HTTP_200_OK)

    except UserTokenAuth.DoesNotExist:
        return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.exception("Unexpected error occurred")
        return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def send_otp_email(request):
    """Sends otp to email for email verification."""
    token = request.data.get('token', '').strip()
    test = True if int(os.getenv("TEST")) == 1 else False

    try:
        if not token:
            return Response({"error": "Token is required."}, status=status.HTTP_400_BAD_REQUEST)

        token_obj = UserTokenAuth.objects.get(token=token)
        email = token_obj.user.email
        details = send_email_otp(email, test)

        if details["status"] == False:
            return Response({"error": "Failed to send OTP email."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        token_obj.otp = details["otp"]
        token_obj.save()
        return Response({"message": f"OTP successfully sent to {email}"}, status=status.HTTP_200_OK)

    except UserTokenAuth.DoesNotExist:
        return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        logger.exception("Unexpected error occurred")
        return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def send_otp_phoneno(request):
    """Sends otp to phone for phone number verification."""
    token = request.data.get("token", "").strip()
    test = True if int(os.getenv("TEST")) == 1 else False
    try:
        if not token:
            return Response({"error": "Token is required."}, status=status.HTTP_400_BAD_REQUEST)

        token_obj = UserTokenAuth.objects.get(token=token)
        phone_no = token_obj.user.phone_no
        details = send_otp_phone(phone_no, test)
        if details["status"] == False:
            return Response({"error": "Failed to send OTP phone."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        token_obj.otp = details["otp"]
        token_obj.save()
        return Response({"message": f"OTP successfully sent to {phone_no}"}, status=status.HTTP_200_OK)

    except UserTokenAuth.DoesNotExist:
        return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.exception("Unexpected error occurred")
        return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def check_otp(request):
    """Checks the if the give otp is valid for both email and phone number verification."""
    token = request.data.get("token", "").strip()
    otp = request.data.get("otp", "").strip()
    otp_type = request.data.get("otp_type", "").strip()
    try:
        if not token:
            return Response({"error": "Token is required."}, status=status.HTTP_400_BAD_REQUEST)
        if not otp:
            return Response({"error": "OTP is required."}, status=status.HTTP_400_BAD_REQUEST)
        if not otp_type:
            return Response({"error": "OTP Type is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            otp = int(otp)
        except ValueError:
            return Response({"error": "OTP must be an integer."}, status=status.HTTP_400_BAD_REQUEST)


        token_obj = UserTokenAuth.objects.get(token=token)
        true_otp = token_obj.otp

        if not true_otp:
            return Response({"error": "Send OTP first, no OTP found."}, status=status.HTTP_400_BAD_REQUEST)

        if true_otp == otp:
            token_obj.otp = None
            if otp_type == 'email':
                token_obj.email_verified = True
            elif otp_type == 'phone':
                token_obj.phone_verified = True
            else:
                return Response({"error": "OTP Type must be 'phone' or 'email'."}, status=status.HTTP_400_BAD_REQUEST)
            token_obj.save()
            return Response({"message": "OTP verified successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid OTP."}, status=status.HTTP_401_UNAUTHORIZED)

    except UserTokenAuth.DoesNotExist:
        return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.exception("Unexpected error occurred")
        return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
