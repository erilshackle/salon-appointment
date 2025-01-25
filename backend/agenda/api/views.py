from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from ..models import Servico, HorarioRecorrente, Agendamento
from .serializers import ServicoSerializer, HorarioRecorrenteSerializer, AgendamentoSerializer
from datetime import datetime

# **ServicoView** para listar e criar serviços
class ServicoView(APIView):
    def get(self, request, id=None):
        if id:
            try:
                servico = Servico.objects.get(id=id)
                serializer = ServicoSerializer(servico)
                return Response(serializer.data)
            except Servico.DoesNotExist:
                return Response({"error": "Serviço não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        else:
            servicos = Servico.objects.all()
            serializer = ServicoSerializer(servicos, many=True)
            return Response(serializer.data)

    def post(self, request):
        serializer = ServicoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, id):
        try:
            servico = Servico.objects.get(id=id)
        except Servico.DoesNotExist:
            return Response({"error": "Serviço não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ServicoSerializer(servico, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id):
        try:
            servico = Servico.objects.get(id=id)
            servico.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Servico.DoesNotExist:
            return Response({"error": "Serviço não encontrado."}, status=status.HTTP_404_NOT_FOUND)

# **HorarioDisponivelView** para verificar horários disponíveis
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

# **AgendamentoView** para criar agendamentos
class AgendamentoView(APIView):
    def get(self, request):
        agendamentos = Agendamento.objects.all()
        serializer = AgendamentoSerializer(agendamentos, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = AgendamentoSerializer(data=request.data)
        if serializer.is_valid():
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

# **AgendamentoDetailView** para editar e excluir agendamentos
class AgendamentoDetailView(APIView):
    def get_agendamento(self, pk):
        try:
            return Agendamento.objects.get(pk=pk)
        except Agendamento.DoesNotExist:
            raise serializers.ValidationError("Agendamento não encontrado.")

    def put(self, request, pk):
        agendamento = self.get_agendamento(pk)
        serializer = AgendamentoSerializer(agendamento, data=request.data)
        if serializer.is_valid():
            # Validação customizada
            data = serializer.validated_data['data']
            hora = serializer.validated_data['hora']
            dia_semana = data.weekday()

            # Verifica a disponibilidade
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
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        agendamento = self.get_agendamento(pk)
        agendamento.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# **HorarioRecorrenteView** para gerenciar horários de atendimento
class HorarioRecorrenteView(APIView):
    def get(self, request):
        horarios = HorarioRecorrente.objects.all()
        serializer = HorarioRecorrenteSerializer(horarios, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = HorarioRecorrenteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# **HorarioRecorrenteDetailView** para editar ou excluir horários específicos
class HorarioRecorrenteDetailView(APIView):
    def get_horario(self, pk):
        try:
            return HorarioRecorrente.objects.get(pk=pk)
        except HorarioRecorrente.DoesNotExist:
            raise serializers.ValidationError("Horário não encontrado.")

    def put(self, request, pk):
        horario = self.get_horario(pk)
        serializer = HorarioRecorrenteSerializer(horario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        horario = self.get_horario(pk)
        horario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
