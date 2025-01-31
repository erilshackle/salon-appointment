# users/models.py
from django.db import models

class Funcionario(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    cargo = models.CharField(max_length=100, blank=True)
    telefone = models.CharField(max_length=15, blank=True)
    data_admissao = models.DateField()

    def __str__(self):
        return self.nome
