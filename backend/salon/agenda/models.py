from django.db import models

class Servico(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    descricao = models.TextField(blank=True, null=True)
    tempo_estimado = models.DurationField()  # Exemplo: 00:30:00
    categoria = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.nome

class HorarioDeAtendimento(models.Model):
    dia_semana = models.CharField(max_length=9)  # Exemplo: Segunda-feira
    hora_inicio = models.TimeField()
    hora_fim = models.TimeField()

    def __str__(self):
        return f"{self.dia_semana}: {self.hora_inicio} - {self.hora_fim}"

class Agendamento(models.Model):
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE)
    nome_cliente = models.CharField(max_length=100)
    data = models.DateField()
    hora = models.TimeField()

    def __str__(self):
        return f"{self.nome_cliente} - {self.servico.nome} ({self.data} {self.hora})"
