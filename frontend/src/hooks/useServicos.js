import { useState, useEffect } from "react";
import { getServicos } from "@/services/ServicoService";

export function useServicos() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchServicos() {
      try {
        const data = await getServicos();
        setServicos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchServicos();
  }, []);

  return { servicos, loading, error };
}
