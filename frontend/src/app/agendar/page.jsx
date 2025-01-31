'use client';

import { useState, useEffect } from "react";
import { useServicos } from "@/hooks/useServicos";
import { useHorarios } from "@/hooks/useHorarios";
import AgendarForm from "@/components/AgendarForm";
import axios from "@/services/axios";
import Navbar from "@/components/Navbar"; // 🔹 Importando o menu

export default function Agendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { servicos, loading: servicosLoading, error: servicosError } = useServicos();
  const [horarios, setHorarios] = useState([]);

  const [formData, setFormData] = useState({
    nome_cliente: '',
    email: '',
    telefone: '',
    servico: '',
    data: '',
    hora: ''
  });

  const fetchHorarios = async (dataSelecionada) => {
    try {
      const response = await axios.get(`/api/horarios-disponiveis/?data=${dataSelecionada}`);
      setHorarios(response.data.length > 0 ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar horários:", error);
      setHorarios([]);
    }
  };

  useEffect(() => {
    console.log("Serviços:", servicos);
    console.log("Horários:", horarios);
  }, [servicos, horarios]);

  if (servicosLoading) return <p className="text-center text-gray-600">Carregando serviços...</p>;
  if (servicosError) return <p className="text-center text-red-500">Erro ao carregar serviços!</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="flex-grow flex items-center justify-center w-full px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg mt-20">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Agendar Atendimento</h1>
          <AgendarForm
            servicos={servicos || []} // Passando a lista de serviços
            servicoSelecionado={formData.servico} // Passando o serviço selecionado
            horarios={horarios || []}
            formData={formData}
            setFormData={setFormData}
            fetchHorarios={fetchHorarios}
          />
        </div>
      </div>
    </div>
  );
}