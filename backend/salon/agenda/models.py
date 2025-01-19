from django.db import models
from django.core.exceptions import ValidationError
# from django.contrib.auth.models import User

class Servico(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    descricao = models.TextField(blank=True, null=True)
    tempo_estimado = models.DurationField()
    categoria = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.nome

class HorarioRecorrente(models.Model):
    DIAS_DA_SEMANA = [
        (0, 'Segunda-feira'),
        (1, 'Terça-feira'),
        (2, 'Quarta-feira'),
        (3, 'Quinta-feira'),
        (4, 'Sexta-feira'),
        (5, 'Sábado'),
        (6, 'Domingo'),
    ]

    dia_semana = models.IntegerField(choices=DIAS_DA_SEMANA)  # Define o dia da semana
    hora_inicio = models.TimeField()  # Hora de início do expediente
    hora_fim = models.TimeField()  # Hora de fim do expediente

    def __str__(self):
        dia = dict(self.DIAS_DA_SEMANA)[self.dia_semana]
        return f"{dia} das {self.hora_inicio} às {self.hora_fim}"

class Agendamento(models.Model):
    # usuario = models.ForeignKey(
    #     User, on_delete=models.SET_NULL, null=True, blank=True, related_name="agendamentos"
    # )  # Associado ao usuário autenticado
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE)
    nome_cliente = models.CharField(max_length=100)
    data = models.DateField()  # Data específica do agendamento
    hora = models.TimeField()  # Hora específica do agendamento

    def __str__(self):
        return f"{self.nome_cliente} - {self.servico.nome} ({self.data} {self.hora})"

    def clean(self):
        # Verificar se existe um horário recorrente para o dia e hora especificados
        dia_semana = self.data.weekday()  # Obtém o dia da semana (0=Segunda, 6=Domingo)
        horario = HorarioRecorrente.objects.filter(
            dia_semana=dia_semana, 
            hora_inicio__lte=self.hora, 
            hora_fim__gte=self.hora
        ).first()

        if not horario:
            raise ValidationError("Não há horário de atendimento disponível para a data e hora selecionadas.")

        # Verificar se o horário já foi reservado
        if Agendamento.objects.filter(data=self.data, hora=self.hora).exists():
            raise ValidationError("Este horário já foi reservado.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
