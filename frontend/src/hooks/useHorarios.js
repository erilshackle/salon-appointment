export async function getHorariosDisponiveis(data) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/horarios/?data=${data}`
    );
    const dataDisponivel = await response.json();
    return dataDisponivel;
  }
  