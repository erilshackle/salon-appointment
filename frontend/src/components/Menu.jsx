'use client';

export default function Menu() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        <div className="flex space-x-4">
          <a href="/" className="hover:text-gray-300">Início</a>
          <a href="/agendar" className="hover:text-gray-300">Agendar</a>
          <a href="/servicos" className="hover:text-gray-300">Serviços</a>
          <a href="/login" className="hover:text-gray-300">Login</a>
        </div>
      </div>
    </nav>
  );
}
