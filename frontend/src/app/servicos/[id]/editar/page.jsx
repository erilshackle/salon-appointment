'use client';

import { useParams, useRouter } from 'next/navigation'; // Importando useParams
import { useState, useEffect } from 'react';

export default function EditarServico() {
  const { id } = useParams();  // Usando useParams para acessar os parâmetros
  const [servico, setServico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchServico() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/servicos/${id}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar serviço: ${response.status}`);
        }
        const data = await response.json();
        setServico(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }

    fetchServico();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/servicos/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servico),
      });
      if (!response.ok) {
        throw new Error(`Erro ao atualizar serviço: ${response.status}`);
      }
      router.push("/servicos");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Editar Serviço</h1>
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            value={servico.nome}
            onChange={(e) => setServico({ ...servico, nome: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Descrição</label>
          <textarea
            value={servico.descricao || ""}
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
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}
