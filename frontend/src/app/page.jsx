'use client';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Bem-vindo ao Sistema de Agendamento!
        </h1>
        <p className="text-lg text-gray-600">
          Comece agendando seus serviços com facilidade!
        </p>
      </div>
    </main>
  );
}
