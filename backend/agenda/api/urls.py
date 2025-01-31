from django.urls import path
from .views import ServicoView, HorarioDisponivelView, HorarioRecorrenteView, HorarioRecorrenteDetailView, AgendamentoView, AgendamentoDetailView

urlpatterns = [
    # servicos
    path('servicos/', ServicoView.as_view(), name='servicos'),
    path('servicos/<int:id>/', ServicoView.as_view(), name='servico-detail'),
    #agendamentos
    path('agendamentos/', AgendamentoView.as_view(), name='agendamentos'),
    path('agendamentos/<int:pk>/', AgendamentoDetailView.as_view(), name='agendamento-detail'),
    # horarios disponiveis para uma /?data
    path('horarios-disponiveis/', HorarioDisponivelView.as_view(), name='horarios-disponiveis'),
    # horarios
    path('horarios/', HorarioRecorrenteView.as_view(), name='horarios'),
    path('horarios/<int:pk>/', HorarioRecorrenteDetailView.as_view(), name='horario-detail'),
       
]
