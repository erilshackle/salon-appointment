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

class HorarioDeAtendimento(models.Model):
    dia = models.DateField()  # Data específica
    hora_inicio = models.TimeField()
    hora_fim = models.TimeField()
    disponivel = models.BooleanField(default=True)  # Define se o horário está disponível

    def __str__(self):
        return f"{self.dia} - {self.hora_inicio} às {self.hora_fim} - {'Disponível' if self.disponivel else 'Indisponível'}"

class Agendamento(models.Model):
    # usuario = models.ForeignKey(
    #     User, on_delete=models.SET_NULL, null=True, blank=True, related_name="agendamentos"
    # )  # Associado ao usuário autenticado
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE)
    nome_cliente = models.CharField(max_length=100)
    data = models.DateField()
    hora = models.TimeField()

    def __str__(self):
        return f"{self.nome_cliente} - {self.servico.nome} ({self.data} {self.hora})"

    def clean(self):
        # Verificar se o horário está disponível
        horario = HorarioDeAtendimento.objects.filter(
            dia=self.data, hora_inicio__lte=self.hora, hora_fim__gte=self.hora, disponivel=True
        ).first()

        if not horario:
            raise ValidationError("O horário selecionado não está disponível.")

        # Verificar se o horário já foi reservado
        if Agendamento.objects.filter(data=self.data, hora=self.hora).exists():
            raise ValidationError("Este horário já foi reservado.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
