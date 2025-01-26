// src/components/ServicoList.jsx
'use client';

import useServicos from '@/hooks/useServicos';
import AdicionarServicoButton from './AdicionarServicoButton';

export default function ServicoList() {
  const { servicos, loading, error } = useServicos();

  if (loading) return <div>Carregando serviços...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Serviços</h1>
      <AdicionarServicoButton />

      <ul className="space-y-4">
        {servicos.map((servico) => (
          <li key={servico.id} className="p-4 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{servico.nome}</h3>
            <p>{servico.categoria}</p>
            <p>{servico.preco} USD</p>
            <p>{servico.tempo_estimado}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
