# agenda/admin.py
from django.contrib import admin
from .models import Servico, HorarioRecorrente, Agendamento

# Configuração para o modelo Servico
class ServicoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'preco', 'tempo_estimado', 'categoria')  # Campos exibidos na lista
    search_fields = ('nome', 'categoria')  # Campos pesquisáveis
    list_filter = ('categoria',)  # Filtros laterais

# Configuração para o modelo HorarioRecorrente
class HorarioRecorrenteAdmin(admin.ModelAdmin):
    list_display = ('dia_semana', 'hora_inicio', 'hora_fim')  # Campos exibidos na lista
    search_fields = ('dia_semana',)  # Campos pesquisáveis
    list_filter = ('dia_semana',)  # Filtros laterais

    # Exibir o nome do dia da semana em vez do número
    def dia_semana(self, obj):
        return dict(HorarioRecorrente.DIAS_DA_SEMANA)[obj.dia_semana]
    dia_semana.short_description = 'Dia da Semana'

# Configuração para o modelo Agendamento
class AgendamentoAdmin(admin.ModelAdmin):
    list_display = ('nome_cliente', 'servico', 'data', 'hora')  # Campos exibidos na lista
    search_fields = ('nome_cliente', 'servico__nome')  # Campos pesquisáveis
    list_filter = ('data', 'servico')  # Filtros laterais
    date_hierarchy = 'data'  # Navegação por data

    # Adicionar validação ao salvar no admin
    def save_model(self, request, obj, form, change):
        obj.clean()  # Executa a validação personalizada
        super().save_model(request, obj, form, change)

# Registrar os modelos
admin.site.register(Servico, ServicoAdmin)
admin.site.register(HorarioRecorrente, HorarioRecorrenteAdmin)
admin.site.register(Agendamento, AgendamentoAdmin)