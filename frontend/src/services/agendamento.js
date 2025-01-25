// services/agendamentos.js
import axios from "./axios"; // Importa a instância do axios configurada

export const getAgendamentos = async (token) => {
  try {
    const response = await axios.get("/api/agendamentos/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    throw error;
  }
};

export const deleteAgendamento = async (id, token) => {
  try {
    await axios.delete(`/api/agendamentos/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Erro ao excluir agendamento:", error);
    throw error;
  }
};
