from django.urls import path
from .views import RegisterView
from .views import CustomTokenObtainPairView, register_user
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/new', RegisterView.as_view(), name='register'),

    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('register/', register_user, name='register_user'),
    
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', register_user, name='register_user'),
]
