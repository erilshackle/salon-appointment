'use client';

import { useRouter } from 'next/navigation';

export default function ServicoSelect({ servico, onEditar, onEliminar }) {
  const router = useRouter();

  const handleEscolherServico = () => {
    // Redireciona para a página de agendamento do serviço escolhido
    router.push(`/agendar/`);
  };

  return (
    <div
      className="relative bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={handleEscolherServico}
    >
      <h2 className="text-xl font-semibold">{servico.nome}</h2>
      <p className="text-gray-600 text-sm">{servico.categoria}</p>
      <p className="text-lg font-bold mt-2">R${servico.preco}</p>

      {/* Informações ao hover */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-sm">{servico.descricao ? servico.descricao : 'Sem descrição'}</p>
        <p className="mt-4 text-sm">Tempo Estimado: {servico.tempo_estimado}</p>
      </div>
    </div>
  );
}
