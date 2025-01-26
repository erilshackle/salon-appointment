import { useState, useEffect } from "react";

export function useServicos() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchServicos() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/servicos/`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar serviços: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setServicos(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Erro desconhecido"));
      } finally {
        setLoading(false);
      }
    }

    fetchServicos();
  }, []);

  const createServico = async (newServico) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/servicos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newServico),
      });

      if (!response.ok) throw new Error('Erro ao criar serviço');
      const createdServico = await response.json();
      setServicos([...servicos, createdServico]); // Atualiza a lista com o novo serviço
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarServico = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/servicos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Erro ao eliminar serviço: ${response.status} - ${response.statusText}`);
      }
      setServicos((prev) => prev.filter((servico) => servico.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return { servicos, loading, error, eliminarServico, createServico };
}

export default useServicos;