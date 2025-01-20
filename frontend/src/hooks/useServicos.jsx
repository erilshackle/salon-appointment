import { useState, useEffect } from "react";

export function useServicos() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchServicos() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/servicos/`);
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

  return { servicos, loading, error };
}
