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

# Rota para obter o token
class CustomTokenObtainPairView(TokenObtainPairView):
    pass

# Rota para registrar usuário (opcional)
@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({"error": "Usuário já existe"}, status=400)

    user = User.objects.create_user(username=username, password=password)
    return Response({"message": "Usuário registrado com sucesso!"})
