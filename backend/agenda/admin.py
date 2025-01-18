from django.contrib import admin
from .models import Servico, HorarioDeAtendimento, Agendamento

@admin.register(Servico)
class ServicoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'preco')
    search_fields = ('nome',)
    ordering = ('nome',)

@admin.register(HorarioDeAtendimento)
class HorarioDeAtendimentoAdmin(admin.ModelAdmin):
    list_display = ('id', 'dia_semana', 'hora_inicio', 'hora_fim')
    list_filter = ('dia_semana',)
    ordering = ('dia_semana',)

@admin.register(Agendamento)
class AgendamentoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome_cliente', 'servico', 'data', 'hora')
    list_filter = ('data', 'servico')
    search_fields = ('nome_cliente',)
    ordering = ('data', 'hora')
