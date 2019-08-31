from rest_framework import serializers
# from django.contrib.auth.hashers import make_password

from .models import User, Pet

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'name', 'cellphone', 'password']
    extra_kwargs = {'password': {'write_only': True, }, }

class PetSerializer(serializers.ModelSerializer):
  contact = UserSerializer(many=False, read_only=True)
  class Meta:
    model = Pet
    fields = '__all__'