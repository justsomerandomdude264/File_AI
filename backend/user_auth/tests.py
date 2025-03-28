from rest_framework.test import APITestCase
from rest_framework import status
from django.utils import timezone
from django.urls import reverse
from .models import Auth, UserTokenAuth
import hashlib
import secrets
import os

class AuthAPITests(APITestCase):
    def setUp(self):
        """Set up test data and environment."""
        self.email = "authapi_test@example.com"
        self.username = "authapi_testuser"
        self.password = "testpassword"
        self.phone_no = "+12345678901"
        self.hashed_password = hashlib.sha256(self.password.encode()).hexdigest()
        
        self.user = Auth.objects.create(
            email=self.email,
            username=self.username,
            passwordhash=self.hashed_password,
            phone_no=self.phone_no
        )
        self.token = secrets.token_urlsafe(20)
        self.token_obj = UserTokenAuth.objects.create(
            token=self.token,
            user=self.user,
            request_count=-10,
            last_request_date=None,
            created=timezone.now(),
            email_verified=True,
            phone_verified=True
        )

        self._original_env = os.getenv("TEST")
        os.environ["TEST"] = "1"

    def tearDown(self):
        """Restore the original TEST environment variable."""
        os.environ["TEST"] = self._original_env or "1"

    def test_register(self):
        """Tests the user registration API endpoint."""
        response = self.client.post(reverse("register"), {
            "email": "newuser@example.com",
            "username": "newuser",
            "password": "newpassword",
            "phoneno": "+12345678902"
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("token", response.data)

    def test_login(self):
        """Tests the user login API endpoint."""
        response = self.client.post(reverse("login"), {
            "email": self.email,
            "password": self.password
        })
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertIn("token", response.data)

    def test_logout(self):
        """Tests the user logout API endpoint."""
        response = self.client.post(reverse("logout"), {"token": self.token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "Token deleted successfully.")

    def test_delete_account(self):
        """Tests the delete account API endpoint."""
        response = self.client.delete(reverse('delete_account'), {"token": self.token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "Account deleted successfully.")

    def test_authenticate_token(self):
        """Tests the authenticate token API endpoint."""
        response = self.client.post(reverse('authenticate_token'), {"token": self.token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], self.username)

    def test_send_otp_email(self):
        """Tests the send OTP email API endpoint."""
        response = self.client.post(reverse('send_otp_email'), {"token": self.token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_send_otp_phone(self):
        """Tests the send OTP phone API endpoint."""
        response = self.client.post(reverse('send_otp_phoneno'), {"token": self.token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_check_otp(self):
        """Tests the check OTP API endpoint."""
        self.token_obj.otp = 6942000
        self.token_obj.save()
        response = self.client.post(reverse('check_otp'), {
            "token": self.token,
            "otp": 6942000,
            "otp_type": "email"
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "OTP verified successfully.")