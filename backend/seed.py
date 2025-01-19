import os
import django
from datetime import date, time

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "beauty_salon.settings")
django.setup()

from agenda.models import Servico, HorarioDeAtendimento

# Criando serviços
Servico.objects.create(nome="Corte de Cabelo", preco=50.00, descricao="Corte masculino ou feminino", tempo_estimado="00:30:00", categoria="Cabelo")
Servico.objects.create(nome="Manicure", preco=30.00, descricao="Cuidado e pintura das unhas", tempo_estimado="00:45:00", categoria="Unhas")
Servico.objects.create(nome="Massagem Relaxante", preco=100.00, descricao="Massagem para alívio de estresse", tempo_estimado="01:00:00", categoria="Bem-estar")

# Criando horários de atendimento
HorarioDeAtendimento.objects.create(dia=date(2025, 1, 20), hora_inicio=time(9, 0), hora_fim=time(10, 0), disponivel=True)
HorarioDeAtendimento.objects.create(dia=date(2025, 1, 20), hora_inicio=time(10, 0), hora_fim=time(11, 0), disponivel=True)
HorarioDeAtendimento.objects.create(dia=date(2025, 1, 20), hora_inicio=time(11, 0), hora_fim=time(12, 0), disponivel=True)

print("Serviços e horários criados com sucesso!")
