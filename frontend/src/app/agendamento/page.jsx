'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth"; // Hook para pegar o usuário autenticado
import { useAgendamentos } from "@/hooks/useAgendamentos"; // Hook para agendamentos
import AgendamentoList from "@/components/AgendamentoList";

export default function Agendamentos() {
  const { user } = useAuth(); // Acesso ao usuário autenticado
  const { agendamentos, loading, error, removeAgendamento } = useAgendamentos(user?.token);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Se não estiver logado, redireciona para o login
    }
  }, [user]);

  if (loading) return <p>Carregando agendamentos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Meus Agendamentos</h1>
      <AgendamentoList agendamentos={agendamentos} onDelete={removeAgendamento} />
    </div>
  );
}
