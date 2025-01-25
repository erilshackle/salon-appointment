import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      // Armazena o token JWT no cookie
      Cookies.set("access_token", res.data.access, { expires: 1 }); // Expira em 1 dia
      Cookies.set("refresh_token", res.data.refresh, { expires: 7 }); // Expira em 7 dias

      // Redireciona o usuário após o login
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login", error.response.data);
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
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  );
}
