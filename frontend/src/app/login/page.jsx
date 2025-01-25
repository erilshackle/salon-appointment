"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/token/", { username, password });

      const { access, refresh } = res.data;

      // Salvar os tokens nos cookies
      Cookies.set("access_token", access, { expires: 1 }); // 1 dia
      Cookies.set("refresh_token", refresh, { expires: 7 }); // 7 dias

      // Redirecionar para o dashboard
      router.push("/dashboard");
    } catch (err) {
      setError("Erro no login. Verifique suas credenciais.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2 p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 p-2 border rounded"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  );
}
