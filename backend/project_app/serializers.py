from .models import *
from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = [
            'username', 'password', 'confirm_password', 'email', 
            'user_type', 'contact_number', 'is_approved', 
            'is_email_verified', 'is_active', 'created_at'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'contact_number': {'required': False},
            'is_approved': {'read_only': True},
            'is_email_verified': {'read_only': True},
            'is_active': {'read_only': True},
            'created_at': {'read_only': True}
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return data

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    
    def validate_username(self, value):
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        return value

    def validate_contact_number(self, value):
        if CustomUser.objects.filter(contact_number=value).exists():
            raise serializers.ValidationError("A user with this contact number already exists.")
        return value

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        
        user = CustomUser.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()  
    password = serializers.CharField()

    def validate(self, data):
        identifier = data.get('identifier')
        password = data.get('password')

        user = None
        if '@' in identifier:
            try:
                user = CustomUser.objects.get(email=identifier)
            except CustomUser.DoesNotExist:
                raise serializers.ValidationError({"identifier": "Invalid email or username."})
        else:
            user = authenticate(username=identifier, password=password)

        if user is None or not user.check_password(password):
            raise serializers.ValidationError({"password": "Invalid credentials."})

        return {'user': user}


class UserApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'user_type', 'contact_number', 'is_approved', 'created_at']
        
        
        
        