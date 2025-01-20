export async function getServicos() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/servicos/`);
    const data = await response.json();
    return data;
  }
  