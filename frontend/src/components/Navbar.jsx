'use client';

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 z-10">
      <h1 className="text-xl font-bold text-gray-800">Agendamentos</h1>
      <ul className="flex space-x-6">
        <li><a href="/" className="text-gray-700 hover:text-blue-500">Início</a></li>
        <li><a href="/servicos" className="text-gray-700 hover:text-blue-500">Serviços</a></li>
        <li><a href="/contato" className="text-gray-700 hover:text-blue-500">Contato</a></li>
      </ul>
    </nav>
  );
}
