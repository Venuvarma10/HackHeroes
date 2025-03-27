from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegistrationSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny,IsAuthenticated
from .finml import predict_project

from google import genai 
def suggestions(risk,esg,priority,capital):
    client = genai.Client(api_key="AIzaSyDUaHL8CI0P6ukndFVCVdxzs4qkWWevPNU")

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents="""riskfactor{risk},ESG{esg},preority{priority},Given a set of green finance investment projects, evaluate and recommend the best projects based on the following criteria:

Risk Factor (1-5 scale): Lower risk projects are preferable.

ESG Score (0-100 scale): Higher ESG scores indicate better sustainability and environmental impact.

Priority Level (1-3 scale): Higher priority projects (lower number) should be prioritized.

Capital Allocation: Optimize for projects that fit within the available budget while maximizing returns and impact.

Based on these parameters, generate a ranked list of recommended projects, providing a brief explanation for each selection. Highlight trade-offs between risk and ESG impact and suggest any potential adjustments to improve the investment strategy"""
    )
    return response.text

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
        sug=suggestions(predicted_data[0],predicted_data[1],predicted_data[2],predicted_data[3])
        return Response({'data':{"risk":predicted_data[0],
                                 "ESG":predicted_data[1],
                                 "Preority":predicted_data[2],
                                 "Capital":predicted_data[3]}
                                 ,"Recomendations":sug})