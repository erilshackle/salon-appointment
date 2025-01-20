'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    async function fetchServicos() {
      const response = await fetch("http://localhost:8000/api/servicos/");
      const data = await response.json();
      setServicos(data);
    }

    fetchServicos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Serviços Disponíveis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {servicos.map((servico) => (
          <div key={servico.id} className="border p-4 rounded shadow-md">
            <h2 className="text-2xl font-semibold">{servico.nome}</h2>
            <p>{servico.descricao}</p>
            <p className="text-lg font-bold">Preço: {servico.preco}$00</p>
          </div>
        ))}
      </div>
    </div>
  );
}
