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
    model="gemini-2.0-flash", contents=f"""You are a financial advisor AI specialized in sustainable (ESG) investments. 
Given the following inputs about a project:
- Risk Factor: {risk}
- ESG Score: {esg}
- Priority Level: {priority}
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
    print(result)
    return result

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