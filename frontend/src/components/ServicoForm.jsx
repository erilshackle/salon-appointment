'use client';

import { useState } from 'react';
import useServicos from '@/hooks/useServicos';

export default function ServicoForm({ closeForm, servicoToEdit }) {
  const { createServico } = useServicos();

  const [servico, setServico] = useState({
    nome: servicoToEdit?.nome || '',
    descricao: servicoToEdit?.descricao || '',
    preco: servicoToEdit?.preco || '',
    tempo_estimado: servicoToEdit?.tempo_estimado || '',
    categoria: servicoToEdit?.categoria || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createServico(servico);
    closeForm(); // Fecha o formulário após a criação
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Nome</label>
        <input
          type="text"
          value={servico.nome}
          onChange={(e) => setServico({ ...servico, nome: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Descrição</label>
        <textarea
          value={servico.descricao || ''}
          onChange={(e) => setServico({ ...servico, descricao: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-gray-700">Preço</label>
        <input
          type="number"
          value={servico.preco}
          onChange={(e) => setServico({ ...servico, preco: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Tempo Estimado</label>
        <input
          type="text"
          value={servico.tempo_estimado}
          onChange={(e) => setServico({ ...servico, tempo_estimado: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Ex: 01:30:00"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Categoria</label>
        <input
          type="text"
          value={servico.categoria}
          onChange={(e) => setServico({ ...servico, categoria: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {servicoToEdit ? 'Salvar' : 'Criar Serviço'}
      </button>
    </form>
  );
}
