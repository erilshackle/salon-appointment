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
    router.push(`/dashboard/gerir-servicos/${servico.id}/editar`);
  };

  const handleEliminar = (servico) => {
    if (window.confirm(`Tem certeza que deseja eliminar o serviço "${servico.nome}"?`)) {
      eliminarServico(servico.id);
    }
  };

  const handleAdicionar = () => {
    // Navegar para a página de adição de serviço
    router.push("gerir-servicos/criar");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Serviços Disponíveis</h1>
      
      {/* Botão de adicionar serviço */}
      <div className="text-right mb-4">
        <button
          onClick={handleAdicionar}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Adicionar Serviço
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
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
