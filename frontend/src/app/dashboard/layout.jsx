// src/app/dashboard/layout.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <nav>
          <ul>
            <li><Link href="/dashboard">Visão Geral</Link></li>
            <li><Link href="/dashboard/criar-usuario">Criar Usuário</Link></li>
            <li><Link href="/dashboard/gerir-servicos">Gerir Serviços</Link></li>
            <li><Link href="/dashboard/agendamentos">Agendamentos</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
