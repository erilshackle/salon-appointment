from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    # Renderiza uma página HTML simples
    return render(request, 'home.html')
