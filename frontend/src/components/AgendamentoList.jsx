// components/AgendamentoList.js
import React from "react";

const AgendamentoList = ({ agendamentos, onDelete }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Meus Agendamentos</h2>
      {agendamentos.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        <ul>
          {agendamentos.map((agendamento) => (
            <li key={agendamento.id} className="mb-4 p-4 border-b">
              <p><strong>Serviço:</strong> {agendamento.servico}</p>
              <p><strong>Data:</strong> {agendamento.data}</p>
              <p><strong>Hora:</strong> {agendamento.hora}</p>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => onDelete(agendamento.id)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgendamentoList;
