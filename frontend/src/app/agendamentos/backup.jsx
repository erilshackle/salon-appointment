'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAgendamentos } from "@/hooks/useAgendamentos"; // Hook para agendamentos
import AgendamentoList from "@/components/AgendamentoList";

export default function Agendamentos() {
  const { agendamentos, loading, error, removeAgendamento } = useAgendamentos(user?.token );
  const router = useRouter();



  if (loading) return <p>Carregando agendamentos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Meus Agendamentos</h1>
      <AgendamentoList agendamentos={agendamentos} onDelete={removeAgendamento} />
    </div>
  );
}
