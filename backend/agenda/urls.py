from django.urls import path
from .api.views import ServicoView, HorarioDisponivelView, HorarioRecorrenteView, HorarioRecorrenteDetailView, AgendamentoView, AgendamentoDetailView

urlpatterns = [
    path('servicos/', ServicoView.as_view(), name='servicos'),
    path('agendamentos/', AgendamentoView.as_view(), name='agendamentos'),
    path('agendamentos/<int:pk>/', AgendamentoDetailView.as_view(), name='agendamento-detail'),
    path('horarios-disponiveis/', HorarioDisponivelView.as_view(), name='horarios-disponiveis'),
    path('horarios/', HorarioRecorrenteView.as_view(), name='horarios'),
    path('horarios/<int:pk>/', HorarioRecorrenteDetailView.as_view(), name='horario-detail'),
    
]
