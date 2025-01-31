# urls.py (no diretório principal do seu app)
from django.urls import path, include
from .views import home

urlpatterns = [
    path('', home, name='home'),
    path('api/', include('agenda.api.urls')),
]