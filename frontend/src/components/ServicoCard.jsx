export default function ServicoCard({ servico }) {
    return (
      <div className="border p-4 rounded shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold text-blue-500">{servico.nome}</h2>
        <p className="text-gray-600">{servico.descricao}</p>
        <p className="text-lg font-bold text-green-600">Preço: {servico.preco}$00</p>
      </div>
    );
  }
  