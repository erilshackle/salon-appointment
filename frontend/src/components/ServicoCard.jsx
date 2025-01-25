export default function ServicoCard({ servico, onEditar, onEliminar }) {
  return (
    <div className="border p-4 rounded shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-semibold text-blue-500">{servico.nome}</h2>
      <p className="text-gray-600">{servico.descricao}</p>
      <p className="text-lg font-bold text-green-600">Preço: {servico.preco}$00</p>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => onEditar(servico)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Editar
        </button>
        <button
          onClick={() => onEliminar(servico)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
