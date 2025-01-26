'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CriarServico() {
  const [servico, setServico] = useState({
    nome: '',
    descricao: '',
    preco: '',
    tempo_estimado: '',
    categoria: '',  // Categoria como texto
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/servicos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(servico),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar serviço: ${response.status}`);
      }

      // Após criar o serviço, redireciona para a página de serviços
      router.push('gerir-servicos');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Criar Serviço</h1>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="mt-6 space-y-4">
        {/* Nome */}
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

        {/* Descrição */}
        <div>
          <label className="block text-gray-700">Descrição</label>
          <textarea
            value={servico.descricao || ''}
            onChange={(e) => setServico({ ...servico, descricao: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Preço */}
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

        {/* Tempo Estimado */}
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

        {/* Categoria */}
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

        {/* Botão para enviar */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Criando...' : 'Criar Serviço'}
        </button>
      </div>
    </form>
  );
}
