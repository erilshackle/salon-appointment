'use client'

import { useState } from "react";
import { useServicos } from "@/hooks/useServicos";
import { useHorarios } from "@/hooks/useHorarios";
import AgendarForm from "@/components/AgendarForm";

export default function Agendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const { servicos, loading: servicosLoading, error: servicosError } = useServicos();
  const { horarios, loading: horariosLoading, error: horariosError } = useHorarios(selectedDate);

  if (servicosLoading || horariosLoading) return <p>Carregando...</p>;
  if (servicosError || horariosError) return <p>Erro ao carregar dados!</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Agendar Atendimento</h1>
      <h1>Agendar Serviço</h1>
      <AgendarForm
        servicos={servicos || []} // Certifique-se de passar um array vazio se estiver vazio
        horarios={horarios || []}
        onDateChange={setSelectedDate}
      />
    </div>
  );
}
