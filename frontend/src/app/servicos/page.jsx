'use client'

import { useRouter } from "next/navigation"; 
import { useServicos } from "@/hooks/useServicos";
import ServicoSelect from "@/components/ServicoSelect";

export default function Servicos() {
  const { servicos, loading, error } = useServicos();
  const router = useRouter();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os serviços: {error.message}</div>;

  const handleServicoSelect = (id) => {
    router.push(`/agendar/`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Serviços Disponíveis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {servicos.map((servico) => (
          <ServicoSelect
            key={servico.id}
            servico={servico}
            onClick={() => handleServicoSelect(servico.id)} // Passar o ID do serviço
          />
        ))}
      </div>
    </div>
  );
}
