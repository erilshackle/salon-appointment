'use client'

import { useState } from "react";
import { useServicos } from "@/hooks/useServicos";
import { getHorariosDisponiveis } from "@/hooks/useHorarios";
import AgendarForm from "@/components/AgendarForm";

export default function Agendar() {
  const [formData, setFormData] = useState({
    servico: "",
    data: "",
    hora: "",
    nome_cliente: "",
  });

  const { servicos, loading, error } = useServicos();
  const { horarios, fetchHorarios } = getHorariosDisponiveis(formData.data);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os serviços: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Agendar Atendimento</h1>
      <AgendarForm
        servicos={servicos}
        horarios={horarios}
        formData={formData}
        setFormData={setFormData}
        fetchHorarios={fetchHorarios}
      />
    </div>
  );
}
