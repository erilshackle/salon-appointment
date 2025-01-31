// src/app/dashboard/agendamentos/page.jsx
"use client";

import { useState, useEffect } from "react";
import api from "@/services/api"; // Certifique-se de que está configurada para lidar com os agendamentos

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar agendamentos realizados
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await api.get("/agendamentos"); // API para listar agendamentos
        setAgendamentos(response.data);
      } catch (error) {
        console.error("Erro ao carregar agendamentos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, []);

  // Função para eliminar um agendamento
  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja eliminar este agendamento?")) return;

    try {
      await api.delete(`/agendamentos/${id}`);
      setAgendamentos((prevAgendamentos) => prevAgendamentos.filter((agendamento) => agendamento.id !== id));
    } catch (error) {
      console.error("Erro ao eliminar agendamento", error);
    }
  };

  if (loading) return <p>Carregando agendamentos...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Agendamentos Realizados</h1>
      {agendamentos.length === 0 ? (
        <p className="text-gray-500">Nenhum agendamento realizado ainda.</p>
      ) : (
        <ul>
          {agendamentos.map((agendamento) => (
            <li key={agendamento.id} className="mb-4 border p-4 rounded-md shadow-sm flex justify-between items-center">
              <div>
                <p><strong>Cliente:</strong> {agendamento.nome_cliente}</p>
                <p><strong>Serviço:</strong> {agendamento.servico}</p>
                <p><strong>Data:</strong> {agendamento.data}</p>
                <p><strong>Hora:</strong> {agendamento.hora}</p>
              </div>
              <button 
                onClick={() => handleDelete(agendamento.id)} 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
