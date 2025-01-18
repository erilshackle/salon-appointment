from rest_framework.routers import DefaultRouter
from .views import ServicoViewSet, HorarioDeAtendimentoViewSet, AgendamentoViewSet

router = DefaultRouter()
router.register(r'servicos', ServicoViewSet, basename='servicos')
router.register(r'horarios', HorarioDeAtendimentoViewSet, basename='horarios')
router.register(r'agendamentos', AgendamentoViewSet, basename='agendamentos')

urlpatterns = router.urls
