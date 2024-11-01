from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import AuthSerializer
from .models import Auth, UserTokenAuth
import hashlib
import secrets
from django.utils import timezone

@api_view(['POST'])
def register(request):
    hashed_password = hashlib.sha256(request.data['password'].encode('utf-8')).hexdigest()
    data = {
        'email': request.data['email'],
        'username': request.data['username'],
        'passwordhash': hashed_password
    }
    serializer = AuthSerializer(data=data)
    if serializer.is_valid():
        user = serializer.save()
        token_obj = UserTokenAuth.objects.create(
            token=generate_token(),
            user=user,
            request_count=0,
            last_request_date=None,
            created=timezone.now()
        )
        return Response({"token": token_obj.token}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    email = request.data["email"]
    hashed_password = hashlib.sha256(request.data["password"].encode('utf-8')).hexdigest()
    try:
        user = Auth.objects.get(email=email)
        if not (user.passwordhash == hashed_password):
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            token_obj = UserTokenAuth.objects.get(user=user)
            return Response({"token": token_obj.token}, status=status.HTTP_202_ACCEPTED)
        except UserTokenAuth.DoesNotExist:
            token_obj = UserTokenAuth.objects.create(
                token=generate_token(),
                user=user,
                request_count=0,
                last_request_date=None,
                created=timezone.now()
            )
            return Response({"token": token_obj.token}, status=status.HTTP_202_ACCEPTED)  
    except Auth.DoesNotExist:
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def logout(request):
    token = request.data.get("token")
    try:
        UserTokenAuth.objects.get(token=token).delete()
        return Response({"message": "Token deleted successfully."}, status=status.HTTP_200_OK)
    except UserTokenAuth.DoesNotExist:
        return Response({"error": "Token is invalid"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def authenticate_token(request):
    token = request.data.get("token")
    try:
        token_obj = UserTokenAuth.objects.get(token=token)
        user=token_obj.user
        return Response({"username": user.username, "email": user.email}, status=status.HTTP_200_OK)
    except UserTokenAuth.DoesNotExist:
         return Response({"error": "Token is invalid"}, status=status.HTTP_401_UNAUTHORIZED)

def generate_token():
    return secrets.token_urlsafe(20)