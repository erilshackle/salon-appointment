from django.db import models
from django.core.exceptions import ValidationError

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

    dia_semana = models.IntegerField(choices=DIAS_DA_SEMANA)
    hora_inicio = models.TimeField()
    hora_fim = models.TimeField()

    def clean(self):
        # Verificar se o horário não se sobrepõe a outro horário do mesmo dia
        horarios_conflitantes = HorarioRecorrente.objects.filter(
            dia_semana=self.dia_semana,
            hora_inicio__lt=self.hora_fim,
            hora_fim__gt=self.hora_inicio
        )

        if horarios_conflitantes.exists():
            raise ValidationError("Este horário se sobrepõe a outro agendamento no mesmo dia.")


    def __str__(self):
        dia = dict(self.DIAS_DA_SEMANA)[self.dia_semana]
        return f"{dia} das {self.hora_inicio} às {self.hora_fim}"

class Agendamento(models.Model):
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE)
    nome_cliente = models.CharField(max_length=100)
    data = models.DateField()
    hora = models.TimeField()

    def __str__(self):
        return f"{self.nome_cliente} - {self.servico.nome} ({self.data} {self.hora})"

    def clean(self):
        # Verificar se existe um horário recorrente para o dia e hora especificados
        dia_semana = self.data.weekday()
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

        # Atualizar o horário para não disponível
        horario.disponivel = False
        horario.save()

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
