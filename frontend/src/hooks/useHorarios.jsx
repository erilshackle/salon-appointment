import { useState, useEffect } from "react";

export function useHorarios(selectedDate) {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedDate) return;

    async function fetchHorarios() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/horarios/?data=${selectedDate}`);
        const data = await response.json();
        setHorarios(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchHorarios();
  }, [selectedDate]);

  return { horarios, loading, error };
}
