export async function agendarServico(data) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/agendamentos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Erro ao agendar");
    }
    return response.json();
  }
  