from django.urls import path
from .views import RegisterFuncionarioView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Rota para registrar o funcionário
    path('register/', RegisterFuncionarioView.as_view(), name='register_funcionario'),
    
    # Rota para obter o token JWT
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Rota para obter um novo token JWT com o refresh token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
