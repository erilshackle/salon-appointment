from django.db import models
from django.core.exceptions import ValidationError

class Servico(models.Model):
    nome = models.CharField(max_length=100)  # Nome do serviço
    preco = models.DecimalField(max_digits=10, decimal_places=2)  # Preço do serviço
    descricao = models.TextField(blank=True, null=True)  # Descrição do serviço
    tempo_estimado = models.DurationField()  # Tempo estimado de duração do serviço
    categoria = models.CharField(max_length=100, blank=True, null=True)  # Categoria do serviço

    def __str__(self):
        return f"{self.nome} - R${self.preco}"

class HorarioDeAtendimento(models.Model):
    dia_semana = models.CharField(max_length=9)  # Exemplo: "Segunda-feira"
    hora_inicio = models.TimeField()  # Horário de início do expediente
    hora_fim = models.TimeField()  # Horário de fim do expediente

    def __str__(self):
        return f"{self.dia_semana}: {self.hora_inicio} - {self.hora_fim}"

class Agendamento(models.Model):
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE)  # Serviço selecionado
    nome_cliente = models.CharField(max_length=100)  # Nome do cliente
    data = models.DateField()  # Data do agendamento
    hora = models.TimeField()  # Hora do agendamento

    def __str__(self):
        return f"{self.nome_cliente} - {self.servico.nome} ({self.data} {self.hora})"

    def clean(self):
        # Verificar se o horário está dentro do expediente
        dia_semana = self.data.strftime('%A')  # Dia da semana em inglês
        horario_atendimento = HorarioDeAtendimento.objects.filter(dia_semana=dia_semana).first()
        if not horario_atendimento:
            raise ValidationError(f"O salão não funciona na data selecionada ({dia_semana}).")

        if not (horario_atendimento.hora_inicio <= self.hora <= horario_atendimento.hora_fim):
            raise ValidationError("Horário fora do expediente.")

        # Verificar se o horário já está ocupado
        if Agendamento.objects.filter(data=self.data, hora=self.hora).exists():
            raise ValidationError("Este horário já está ocupado.")
