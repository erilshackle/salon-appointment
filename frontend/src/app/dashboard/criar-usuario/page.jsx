// src/app/dashboard/criar-usuario/page.jsx
"use client";

import { useState } from "react";
import api from "@/services/api";

export default function CriarUsuarioPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("gestor"); // Pode ser "gestor", "admin", etc.
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/users/register/", {
        username,
        password,
        role,
      });

      setSuccess("Usuário criado com sucesso!");
      setUsername("");
      setPassword("");
      setRole("gestor");
    } catch (err) {
      setError("Erro ao criar usuário.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Criar Usuário</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border mb-4"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border mb-4"
        />
        {/* <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 border mb-4"
        >
          <option value="gestor">Gestor</option>
          <option value="admin">Admin</option>
        </select> */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Criar Usuário
        </button>
      </form>
    </div>
  );
}
