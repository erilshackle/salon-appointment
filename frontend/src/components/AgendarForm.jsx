'use client';

import { useRouter } from 'next/navigation';
import { agendarServico } from '@/services/AgendamentoService';

export default function AgendarForm({
  servicos, // Lista de serviços recebida via props
  servicoSelecionado, // Serviço selecionado
  formData,
  horarios,
  setFormData,
  fetchHorarios
}) {
  const router = useRouter();

  const handleDataChange = (event) => {
    const dataSelecionada = event.target.value;
    const hoje = new Date().toISOString().split('T')[0];
    const maxData = new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split('T')[0];
  
    if (dataSelecionada < hoje || dataSelecionada > maxData) {
      alert("Selecione uma data entre hoje e o final do próximo mês!");
      return;
    }
    
    setFormData({ ...formData, data: dataSelecionada });
    fetchHorarios(dataSelecionada); // Função permanece inalterada
  };

  const handleServicoChange = (event) => {
    const servicoId = event.target.value;
    setFormData({ ...formData, servico: servicoId });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = { ...formData, servico: formData.servico }; // Garante que o ID do serviço será enviado
      await agendarServico(payload);
      alert('Agendamento realizado com sucesso!');
      router.push('/agendamentos');
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
        <select
          id="servico"
          name="servico"
          value={formData.servico}
          onChange={handleServicoChange}
          className="w-full p-3 border rounded-lg shadow-sm"
          required
        >
          <option value="">Selecione um serviço</option>
          {servicos.map((servico) => (
            <option key={servico.id} value={servico.id}>
              {servico.nome}
            </option>
          ))}
        </select>
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
          min={new Date().toISOString().split('T')[0]}
          max={new Date(new Date().setMonth(new Date().getMonth() + 1))
            .toISOString()
            .split('T')[0]} // Data máxima = último dia do próximo mês
        >
          <option value="">Selecione o horário</option>
          {horarios.map((horario) => {
            const horasDisponiveis = [];
            const horaInicio = parseInt(horario.hora_inicio.split(":")[0]);
            const horaFim = parseInt(horario.hora_fim.split(":")[0]);

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