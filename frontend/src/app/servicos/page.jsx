import { useServicos } from "@/hooks/useServicos";
import ServicoCard from "@/components/ServicoCard";

export default function Servicos() {
  const { servicos, loading, error } = useServicos();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os serviços: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Serviços Disponíveis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {servicos.map((servico) => (
          <ServicoCard key={servico.id} servico={servico} />
        ))}
      </div>
    </div>
  );
}
