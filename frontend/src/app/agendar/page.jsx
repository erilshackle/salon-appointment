'use client'

import { useState, useEffect } from "react";
import { useServicos } from "@/hooks/useServicos";
import { useHorarios } from "@/hooks/useHorarios";
import AgendarForm from "@/components/AgendarForm";
import axios from "@/services/axios";

export default function Agendar() {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Data inicial
  const { servicos, loading: servicosLoading, error: servicosError } = useServicos();
  const [horarios, setHorarios] = useState([]); // Estado para armazenar os horários

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
      const response = await axios.get(`/horarios-disponiveis/?data=${dataSelecionada}`);
      
      // Verifique a resposta e filtre os horários com base no dia da semana
      if (response.data && response.data.length > 0) {
        setHorarios(response.data); // Atualiza os horários
      } else {
        setHorarios([]); // Nenhum horário encontrado para o dia
      }
    } catch (error) {
      console.error("Erro ao buscar horários:", error);
      setHorarios([]); // Caso ocorra erro, limpa os horários
    }
  };

  useEffect(() => {
    console.log("Serviços:", servicos);
    console.log("Horários:", horarios);
  }, [servicos, horarios]);

  if (servicosLoading) return <p>Carregando serviços...</p>;
  if (servicosError) return <p>Erro ao carregar serviços!</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Agendar Atendimento</h1>
      <h1>Agendar Serviço</h1>
      <AgendarForm
        servicos={servicos || []}
        horarios={horarios || []}
        formData={formData}
        setFormData={setFormData}
        fetchHorarios={fetchHorarios} // Passando a função fetchHorarios
      />
    </div>
  );
}
