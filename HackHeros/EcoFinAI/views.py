from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegistrationSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny,IsAuthenticated
from .finml import predict_project

from google import genai
def suggestions():
    client = genai.Client(api_key="AIzaSyDUaHL8CI0P6ukndFVCVdxzs4qkWWevPNU")

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents="Explain how AI works in a few words"
    )
    print(response.text)

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
    permission_classes=[AllowAny]
    def post(self, request):
        data = request.data
        predicted_data= predict_project(data['location'],data['category'],int(data['expected_capital']))
        # serializer = EvaluteSerializer(data=data)
        return Response({'data':{"risk":predicted_data[0],
                                 "ESG":predicted_data[1],
                                 "Preority":predicted_data[2],
                                 "Capital":predicted_data[3]}})