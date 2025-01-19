from datetime import timedelta, time
from django.utils.timezone import now
from .models import Servico, HorarioRecorrente

def popular_servicos():
    print("Adicionando serviços...")
    servicos = [
        {"nome": "Corte de cabelo masculino", "preco": 40.00, "tempo_estimado": timedelta(minutes=30), "categoria": "Cabelo"},
        {"nome": "Corte de cabelo feminino", "preco": 70.00, "tempo_estimado": timedelta(minutes=60), "categoria": "Cabelo"},
        {"nome": "Escova", "preco": 50.00, "tempo_estimado": timedelta(minutes=40), "categoria": "Cabelo"},
        {"nome": "Coloração", "preco": 120.00, "tempo_estimado": timedelta(minutes=120), "categoria": "Cabelo"},
        {"nome": "Manicure", "preco": 30.00, "tempo_estimado": timedelta(minutes=45), "categoria": "Beleza"},
        {"nome": "Pedicure", "preco": 35.00, "tempo_estimado": timedelta(minutes=60), "categoria": "Beleza"},
        {"nome": "Limpeza de pele", "preco": 100.00, "tempo_estimado": timedelta(minutes=90), "categoria": "Estética"},
        {"nome": "Massagem relaxante", "preco": 150.00, "tempo_estimado": timedelta(minutes=60), "categoria": "Bem-estar"},
        {"nome": "Depilação a laser", "preco": 200.00, "tempo_estimado": timedelta(minutes=90), "categoria": "Estética"},
    ]

    for servico in servicos:
        Servico.objects.get_or_create(**servico)
    print("Serviços adicionados com sucesso!")

def popular_horarios():
    print("Adicionando horários recorrentes...")
    dias_semana = {
        "semana": {"dias": range(0, 5), "hora_inicio": time(9, 0), "hora_fim": time(19, 0)},
        "fim_de_semana": {"dias": range(5, 7), "hora_inicio": time(14, 0), "hora_fim": time(20, 0)},
    }

    for periodo, config in dias_semana.items():
        for dia in config["dias"]:
            HorarioRecorrente.objects.get_or_create(
                dia_semana=dia,
                hora_inicio=config["hora_inicio"],
                hora_fim=config["hora_fim"],
            )
    print("Horários adicionados com sucesso!")

def seed():
    print("Iniciando população de dados...")
    popular_servicos()
    popular_horarios()
    print("Dados populados com sucesso!")

# Execute a função rodar_seeds diretamente no Django Shell
# if __name__ == "__main__":
#     seed()
