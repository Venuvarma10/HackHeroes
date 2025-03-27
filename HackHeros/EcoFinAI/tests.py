from django.test import TestCase
<<<<<<< HEAD

# Create your tests here.
=======
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User

class UserAuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.valid_payload = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'strongpassword123'
        }
        self.duplicate_payload = {
            'username': 'testuser',
            'email': 'duplicate@example.com',
            'password': 'strongpassword123'
        }
        self.login_payload = {
            'username': 'testuser',
            'password': 'strongpassword123'
        }

    def test_registration_success(self):
        response = self.client.post('/api/register/', self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], "Successfully Registered")

    def test_registration_duplicate_username(self):
        self.client.post('/api/register/', self.valid_payload)  # Create user first
        response = self.client.post('/api/register/', self.duplicate_payload)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_success(self):
        self.client.post('/api/register/', self.valid_payload)  # Create user first
        response = self.client.post('/api/login/', self.login_payload)
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertIn('token', response.data)

    def test_login_invalid_username(self):
        response = self.client.post('/api/login/', {'username': 'invaliduser', 'password': 'strongpassword123'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_invalid_password(self):
        self.client.post('/api/register/', self.valid_payload)  # Create user first
        response = self.client.post('/api/login/', {'username': 'testuser', 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
>>>>>>> backend
