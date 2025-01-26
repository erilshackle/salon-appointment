'use client'

import { useState, useEffect } from 'react';
import { agendarServico } from '@/services/AgendamentoService';

export default function AgendamentoForm({
  servicos,
  horarios,
  formData,
  setFormData,
  fetchHorarios
}) {
  const handleDataChange = (event) => {
    const dataSelecionada = event.target.value;
    setFormData({ ...formData, data: dataSelecionada });
    fetchHorarios(dataSelecionada);  // Chama a função para obter os horários para a data selecionada
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await agendarServico(formData);
      alert('Agendamento realizado com sucesso!');
    } catch (error) {
      alert('Erro ao realizar o agendamento.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {/* Nome do Cliente */}
      <div>
        <label htmlFor="nome_cliente" className="block font-semibold">
          Nome do Cliente
        </label>
        <input
          type="text"
          id="nome_cliente"
          name="nome_cliente"
          value={formData.nome_cliente}
          onChange={(e) => setFormData({ ...formData, nome_cliente: e.target.value })}
          className="w-full p-3 border rounded-lg shadow-sm"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 border rounded-lg shadow-sm"
          required
        />
      </div>

      {/* Telefone */}
      <div>
        <label htmlFor="telefone" className="block font-semibold">
          Telefone
        </label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          value={formData.telefone || ''}
          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
          className="w-full p-3 border rounded-lg shadow-sm"
          required
        />
      </div>

      {/* Serviço */}
      <div>
        <label htmlFor="servico" className="block font-semibold">
          Serviço
        </label>
        <input
          type="text"
          id="servico"
          name="servico"
          value={servicos.find((servico) => servico.id === formData.servico)?.nome || ''}
          readOnly
          className="w-full p-3 border rounded-lg shadow-sm"
        />
      </div>

      {/* Data */}
      <div>
        <label htmlFor="data" className="block font-semibold">
          Data
        </label>
        <input
          type="date"
          id="data"
          name="data"
          value={formData.data}
          onChange={handleDataChange}
          className="w-full p-3 border rounded-lg shadow-sm"
          required
        />
      </div>

      {/* Hora */}
      <div>
        <label htmlFor="hora" className="block font-semibold">
          Hora
        </label>
        <select
          id="hora"
          name="hora"
          value={formData.hora}
          onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
          className="w-full p-3 border rounded-lg shadow-sm"
          required
        >
          <option value="">Selecione o horário</option>
          {horarios.map((horario) => {
            const horasDisponiveis = [];
            const horaInicio = parseInt(horario.hora_inicio.split(':')[0]);
            const horaFim = parseInt(horario.hora_fim.split(':')[0]);

            for (let i = horaInicio; i <= horaFim; i++) {
              horasDisponiveis.push(i);
            }

            return horasDisponiveis.map((hora) => (
              <option key={hora} value={`${hora}:00`}>
                {hora}:00
              </option>
            ));
          })}
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
      >
        Agendar
      </button>
    </form>
  );
}
