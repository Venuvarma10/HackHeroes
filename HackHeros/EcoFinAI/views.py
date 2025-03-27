from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegistrationSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny,IsAuthenticated

class Registration(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        serializer = RegistrationSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "Successfully Registered"
            }, status=201)
        return Response(serializer.errors, status=400)

class Login(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)  
            return Response({"token": token.key}, status=202) 
        return Response({"message": "Invalid credentials"}, status=401)


class Evalute(APIView):
    permission_classes=[IsAuthenticated]
    def post(self, request):
        return Response({})
