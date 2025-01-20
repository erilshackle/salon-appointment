from rest_framework import serializers
from ..models import Servico, HorarioRecorrente, Agendamento

class ServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servico
        fields = '__all__'

class HorarioRecorrenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorarioRecorrente
        fields = '__all__'

class AgendamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agendamento
        fields = '__all__'
