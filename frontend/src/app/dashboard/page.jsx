"use client";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) {
    return <p>Carregando...</p>; // Ou redirecione para o login
  }

  return (
    <div>
      <h1>Bem-vindo, {user.username}!</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
