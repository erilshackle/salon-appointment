# urls.py (no diretório principal do seu app)
from django.urls import path, include
from .views import CustomTokenObtainPairView, register_user, home

urlpatterns = [
    path('', home, name='home'),
    path('api/', include('agenda.api.urls')),  # Substitua 'app_name' pelo nome do seu app
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', register_user, name='register_user'),
]