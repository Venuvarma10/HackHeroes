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
        model="gemini-2.0-flash", contents=f"""Given the following project details:

Risk Factor (Scale: 1-5, where 1 = Low risk, 5 = High risk): {risk}

ESG Score (Scale: 0-100, where higher is better): {esg}

Priority (Scale: 1-3, where 1 = High priority, 3 = Low priority): {priority}

Initial Capital: {initial_capital}



Provide a recommendation for whether to approve, modify, or reject the project. Justify the decision based on sustainability, financial feasibility, and risk management. If modifications are suggested, propose specific actions such as budget adjustments, risk mitigation strategies, or alternative funding options."""
    )
    print(response.text)
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