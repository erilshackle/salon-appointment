'use client';

import { useState, useEffect } from "react";
import { useServicos } from "@/hooks/useServicos";
import { useHorarios } from "@/hooks/useHorarios";
import AgendarForm from "@/components/AgendarForm";
import axios from "@/services/axios";

export default function Agendar() {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Data inicial
  const { servicos, loading: servicosLoading, error: servicosError } = useServicos();
  const [horarios, setHorarios] = useState([]); // Estado para armazenar os horários

  // Simular seleção de serviço (use um ID dinâmico em produção)
  const selectedServiceId = 1; // ID do serviço selecionado
  const servicoSelecionado = servicos?.find((servico) => servico.id === selectedServiceId);

  const [formData, setFormData] = useState({
    nome_cliente: '',
    email: '',
    telefone: '',
    servico: servicoSelecionado?.id || '', // Inclui o serviço selecionado no estado inicial
    data: '',
    hora: ''
  });

  const fetchHorarios = async (dataSelecionada) => {
    try {
      const response = await axios.get(`/api/horarios-disponiveis/?data=${dataSelecionada}`);
      
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
  if (!servicoSelecionado) return <p>Serviço não encontrado!</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Agendar Atendimento</h1>
      <AgendarForm
        servico={servicoSelecionado} // Passa o serviço como prop
        horarios={horarios || []}
        formData={formData}
        setFormData={setFormData}
        fetchHorarios={fetchHorarios} // Passando a função fetchHorarios
      />
    </div>
  );
}
