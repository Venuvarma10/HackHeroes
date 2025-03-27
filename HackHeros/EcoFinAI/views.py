from django.shortcuts import render
from rest_framework.views import APIView
from

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

