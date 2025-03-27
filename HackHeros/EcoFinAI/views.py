from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser,IsAuthenticated, AllowAny
from .serializers import RegistrationSerializer
from django.contrib.auth import authenticate

# Create your views here.

class Registration(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        data = request.data
        serializer = RegistrationSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            # token = Token.objects.create(user=user)
            # token.save()
            return Response({
                # "user": {
                #     "name": serializer.data['first_name'] + " " + serializer.data['last_name'],
                #     # "token": token.key,
                #     "id":serializer.data['id']
                # }
                "message":"Successfully Registered"
                }, status=201)
        return Response(serializer.errors, status=400)

class Login(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            # token, created = Token.objects.get_or_create(user=user)
            return Response({"name": user.get_full_name(),
                            #  "token": token.key
                             }, status=202)
        return Response({"message": "Invalid credentials"}, status=401)
