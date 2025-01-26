'use client';

import { useState, useEffect } from "react";
import axios from "@/services/axios";

export default function AgendamentosHoje() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar agendamentos do dia atual
  const fetchAgendamentosHoje = async () => {
    try {
      const response = await axios.get("/api/agendamentos-hoje/");
      setAgendamentos(response.data);
    } catch (err) {
      setError("Erro ao buscar os agendamentos do dia.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgendamentosHoje(); // Busca os agendamentos ao carregar a página
  }, []);

  if (loading) return <p>Carregando agendamentos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Agendamentos de Hoje</h1>
      {agendamentos.length === 0 ? (
        <p className="text-center">Nenhum agendamento encontrado para hoje.</p>
      ) : (
        <div className="space-y-4">
          {agendamentos.map((agendamento) => (
            <div
              key={agendamento.id}
              className="p-4 border rounded-lg shadow-md bg-gray-100"
            >
              <p>
                <strong>Cliente:</strong> {agendamento.nome_cliente}
              </p>
              <p>
                <strong>Serviço:</strong> {agendamento.servico.nome}
              </p>
              <p>
                <strong>Hora:</strong> {agendamento.hora}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
