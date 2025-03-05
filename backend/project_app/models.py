import uuid
import random
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

class CustomUser(AbstractUser):
    USER_TYPES = [
        ('staff', 'Staff'),
        ('employee', 'Employee'),
        ('client', 'Client'),
    ]
    
    user_type = models.CharField(max_length=20, choices=USER_TYPES, default='employee', db_index=True)
    contact_number = PhoneNumberField(null=True, blank=True, unique=True, db_index=True)
    is_approved = models.BooleanField(default=False, db_index=True)
    is_email_verified = models.BooleanField(default=False, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(default=timezone.now, db_index=True)

    def __str__(self):
        return self.username


class APIPerformanceLog(models.Model):
    url = models.CharField(max_length=255)
    duration = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.url} - {self.duration} sec"