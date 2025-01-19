from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Servico, HorarioDeAtendimento, Agendamento
from .serializers import ServicoSerializer, HorarioDeAtendimentoSerializer, AgendamentoSerializer

class ServicoView(APIView):
    def get(self, request):
        servicos = Servico.objects.all()
        serializer = ServicoSerializer(servicos, many=True)
        return Response(serializer.data)

class HorarioDisponivelView(APIView):
    def get(self, request):
        horarios = HorarioDeAtendimento.objects.filter(disponivel=True)
        serializer = HorarioDeAtendimentoSerializer(horarios, many=True)
        return Response(serializer.data)

class AgendamentoView(APIView):
    def post(self, request):
        serializer = AgendamentoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
