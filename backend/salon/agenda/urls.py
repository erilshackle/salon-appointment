from django.urls import path
from .api.views import ServicoView, HorarioDisponivelView, AgendamentoView

urlpatterns = [
    # path('', )
    path('servicos/', ServicoView.as_view(), name='servicos'),
    path('horarios-disponiveis/', HorarioDisponivelView.as_view(), name='horarios_disponiveis'),
    path('agendamentos/', AgendamentoView.as_view(), name='agendamentos'),
]
