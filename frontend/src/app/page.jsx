'use client';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Bem-vindo ao Sistema de Agendamento!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Comece agendando seus serviços com facilidade!
        </p>
        <div className="flex space-x-4">
          <a
            href="/agendar"
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Agendar
          </a>
          <a
            href="/servicos"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Serviços
          </a>
          <a
            href="/login"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition"
          >
            Login
          </a>
        </div>
      </div>
    </main>
  );
}
