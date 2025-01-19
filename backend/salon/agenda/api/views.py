from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Servico, HorarioRecorrente, Agendamento
from .serializers import ServicoSerializer, HorarioRecorrenteSerializer, AgendamentoSerializer
from datetime import datetime

class ServicoView(APIView):
    
    def get(self, request):
        servicos = Servico.objects.all()
        serializer = ServicoSerializer(servicos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ServicoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HorarioDisponivelView(APIView):
    
    def get(self, request):
        data = request.query_params.get('data')  # Data fornecida como parâmetro
        try:
            data_obj = datetime.strptime(data, '%Y-%m-%d').date()
        except (ValueError, TypeError):
            return Response({"error": "Data inválida ou não fornecida. Formato esperado: AAAA-MM-DD."},
                            status=status.HTTP_400_BAD_REQUEST)

        dia_semana = data_obj.weekday()
        horarios = HorarioRecorrente.objects.filter(dia_semana=dia_semana)
        agendamentos = Agendamento.objects.filter(data=data_obj)

        # Marcar horários ocupados
        horarios_disponiveis = []
        for horario in horarios:
            hora_ocupada = any(
                horario.hora_inicio <= agendamento.hora < horario.hora_fim
                for agendamento in agendamentos
            )
            if not hora_ocupada:
                horarios_disponiveis.append(horario)

        serializer = HorarioRecorrenteSerializer(horarios_disponiveis, many=True)
        return Response(serializer.data)


class AgendamentoView(APIView):
    
    def post(self, request):
        serializer = AgendamentoSerializer(data=request.data)
        if serializer.is_valid():
            # Validação customizada
            data = serializer.validated_data['data']
            hora = serializer.validated_data['hora']

            dia_semana = data.weekday()
            horario = HorarioRecorrente.objects.filter(
                dia_semana=dia_semana,
                hora_inicio__lte=hora,
                hora_fim__gte=hora,
            ).first()

            if not horario:
                return Response({"error": "Horário indisponível no dia selecionado."},
                                status=status.HTTP_400_BAD_REQUEST)

            if Agendamento.objects.filter(data=data, hora=hora).exists():
                return Response({"error": "Este horário já foi reservado."},
                                status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
