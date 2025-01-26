// src/components/AdicionarServicoButton.jsx
'use client';

import { useState } from 'react';
import ServicoForm from './ServicoForm';

export default function AdicionarServicoButton() {
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      <button
        onClick={handleAddClick}
        className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mb-4"
      >
        Adicionar Serviço
      </button>

      {showForm && (
        <div className="p-4 bg-white shadow-md rounded-lg">
          <ServicoForm closeForm={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
}
