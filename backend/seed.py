from datetime import time, timedelta, date
from myapp.models import Servico, HorarioRecorrente, Agendamento

# Criar serviços
Servico.objects.bulk_create([
    Servico(nome="Corte de cabelo", preco=50.00, tempo_estimado=timedelta(minutes=30)),
    Servico(nome="Manicure", preco=30.00, tempo_estimado=timedelta(minutes=45)),
    Servico(nome="Pedicure", preco=40.00, tempo_estimado=timedelta(minutes=60)),
    Servico(nome="Limpeza de pele", preco=100.00, tempo_estimado=timedelta(minutes=90)),
])

# Criar horários recorrentes
HorarioRecorrente.objects.bulk_create([
    HorarioRecorrente(dia_semana=0, hora_inicio=time(10, 0), hora_fim=time(19, 0)),  # Segunda-feira
    HorarioRecorrente(dia_semana=1, hora_inicio=time(10, 0), hora_fim=time(19, 0)),  # Terça-feira
    HorarioRecorrente(dia_semana=2, hora_inicio=time(10, 0), hora_fim=time(19, 0)),  # Quarta-feira
    HorarioRecorrente(dia_semana=3, hora_inicio=time(10, 0), hora_fim=time(19, 0)),  # Quinta-feira
    HorarioRecorrente(dia_semana=4, hora_inicio=time(10, 0), hora_fim=time(19, 0)),  # Sexta-feira
    HorarioRecorrente(dia_semana=5, hora_inicio=time(10, 0), hora_fim=time(17, 0)),  # Sábado
    HorarioRecorrente(dia_semana=6, hora_inicio=time(10, 0), hora_fim=time(17, 0)),  # Domingo
])

# Criar agendamentos iniciais
servico = Servico.objects.first()
Agendamento.objects.bulk_create([
    Agendamento(servico=servico, nome_cliente="João Silva", data=date(2025, 1, 22), hora=time(10, 30)),
    Agendamento(servico=servico, nome_cliente="Maria Oliveira", data=date(2025, 1, 22), hora=time(11, 30)),
])
