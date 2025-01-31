from django.contrib import admin
from .models import Funcionario

class FuncionarioAdmin(admin.ModelAdmin):
    list_display = ('nome', 'email', 'cargo', 'telefone', 'data_admissao')
    search_fields = ('nome', 'email', 'cargo')
    ordering = ('nome',)

admin.site.register(Funcionario, FuncionarioAdmin)
