
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegistrationSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny,IsAuthenticated
from .finml import predict_project
import json
from google import genai 
from django.contrib.auth.models import User
def suggestions(risk,esg,priority,capital):
    client = genai.Client(api_key="AIzaSyDUaHL8CI0P6ukndFVCVdxzs4qkWWevPNU")

    response = client.models.generate_content(
    model="gemini-2.0-flash", contents=f"""You are a financial advisor AI specialized in sustainable (ESG) investments. 
Given the following inputs about a project:
- Risk Factor: {risk}scale from 1-5 i.e 1 is low 5 high
- ESG Score: {esg}
- Priority Level: {priority}scale from 1-3 i.e 3 is low 1 high
- Available Capital: {capital}

Please provide: 
1. A concise risk assessment.
2. An ESG assessment.
3. Priority justification.
4. Recommended investment strategy.
5. Additional suggestions to improve the project's sustainability and ROI.

Your response should be with in 300 chars and in **valid JSON** format with the following structure:


  "riskAssessment": "<text>",
  "esgAssessment": "<text>",
  "priorityJustification": "<text>",
  "investmentStrategy": "<text>",
  "additionalSuggestions": "<text>"

""")
    print(response.text)
    result=response.text
    result = result.lstrip("```json").rstrip("```")
    result_json = json.loads(result)
    # print(result)
    return result_json

class Registration(APIView):
    permission_classes = [AllowAny]


    def post(self, request):
        data = request.data
        user_data={
            "username":data["userName"],
            "email":data["email"],
            "password":data["password"],
        }
        serializer = RegistrationSerializer(data=user_data)
        if User.objects.filter(username=data["userName"]).exists():
            return Response({"error":"Username already exists"},status =400)
        elif User.objects.filter(email=data["email"]).exists():
            return Response({"error":"Email already exists"},status =400)
        elif serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)  
            return Response({"token": token.key}, status=202) 
        return Response(serializer.errors, status=400)

class Login(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
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
