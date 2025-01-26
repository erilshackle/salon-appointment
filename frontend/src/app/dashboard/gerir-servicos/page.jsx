'use client';

import { useRouter } from "next/navigation"; // Para navegação
import { useServicos } from "@/hooks/useServicos";
import ServicoCard from "@/components/ServicoCard";

export default function Servicos() {
  const { servicos, loading, error, eliminarServico } = useServicos();
  const router = useRouter();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os serviços: {error.message}</div>;

  const handleEditar = (servico) => {
    // Navegar para a página de edição com o ID do serviço na URL
    router.push(`/servicos/${servico.id}/editar`);
  };

  const handleEliminar = (servico) => {
    if (window.confirm(`Tem certeza que deseja eliminar o serviço "${servico.nome}"?`)) {
      eliminarServico(servico.id);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Serviços Disponíveis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {servicos.map((servico) => (
          <ServicoCard
            key={servico.id}
            servico={servico}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
          />
        ))}
      </div>
    </div>
  );
}
