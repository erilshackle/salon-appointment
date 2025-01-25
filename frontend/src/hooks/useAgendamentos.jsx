// hooks/useAgendamentos.js
import { useState, useEffect } from "react";
import { getAgendamentos, deleteAgendamento } from "@/services/agendamentos";

export const useAgendamentos = (token) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        setLoading(true);
        const data = await getAgendamentos(token);
        setAgendamentos(data);
      } catch (error) {
        setError("Erro ao carregar agendamentos");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAgendamentos();
    }
  }, [token]);

  const removeAgendamento = async (id) => {
    try {
      await deleteAgendamento(id, token);
      setAgendamentos(agendamentos.filter((item) => item.id !== id)); // Remove o item da lista local
    } catch (error) {
      setError("Erro ao excluir agendamento");
    }
  };

  return { agendamentos, loading, error, removeAgendamento };
};
