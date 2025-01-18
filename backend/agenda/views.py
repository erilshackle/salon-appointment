from rest_framework import viewsets
from .models import Servico, HorarioDeAtendimento, Agendamento
from .serializers import ServicoSerializer, HorarioDeAtendimentoSerializer, AgendamentoSerializer

class ServicoViewSet(viewsets.ModelViewSet):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer

class HorarioDeAtendimentoViewSet(viewsets.ModelViewSet):
    queryset = HorarioDeAtendimento.objects.all()
    serializer_class = HorarioDeAtendimentoSerializer

class AgendamentoViewSet(viewsets.ModelViewSet):
    queryset = Agendamento.objects.all()
    serializer_class = AgendamentoSerializer

    def perform_create(self, serializer):
        # Chama o método `clean` no modelo antes de salvar
        instance = serializer.save()
        instance.clean()
        instance.save()
