from rest_framework.test import APITestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from user_auth.models import UserTokenAuth, Auth
import hashlib
import secrets
import os

class GPTAPITests(APITestCase):
    """Test cases for GPT API endpoints."""

    def setUp(self):
        """Set up test user and token with text enviroment (variable)"""
        self.user = Auth.objects.create(
            username="gptapi_testuser",
            email="gptapi_test@example.com",
            passwordhash=hashlib.sha256("testpassword".encode()).hexdigest(),
            phone_no="+12345678901"
        )
        self.token_obj = UserTokenAuth.objects.create(
            token=secrets.token_urlsafe(20),
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

    def test_xl_request(self):
        """Test Excel file generation request."""
        response = self.client.post(reverse("xl_gen_request"), {
            "query": "Write a small example excel file.",
            "token": self.token_obj.token
        }, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response["Content-Type"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")

    def test_pdf_request(self):
        """Test PDF file generation request."""
        response = self.client.post(reverse("pdf_gen_request"), {
            "content": "Generate a PDF with sample content.",
            "token": self.token_obj.token
        }, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response["Content-Type"], "application/pdf")

    def test_pdf_content_request(self):
        """Test structured content generation for a PDF."""
        response = self.client.post(reverse("pdf_content_request"), {
            "query": "Generate some structured content for a PDF.",
            "token": self.token_obj.token
        }, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("content", response.json())
