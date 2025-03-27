from rest_framework.serializers import Serializer

from rest_framework import serializers
from django.contrib.auth.models import User


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','password']

    
    def create(self,validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            email = validated_data['email']        
        )
        user.set_password(validated_data['password'])
        user.save()
        return user