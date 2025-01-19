from rest_framework import serializers
from ..models import Servico, HorarioDeAtendimento, Agendamento

class ServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servico
        fields = '__all__'

class HorarioDeAtendimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorarioDeAtendimento
        fields = '__all__'

class AgendamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agendamento
        fields = '__all__'
