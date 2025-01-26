"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Para o App Router

export const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        router.push("/login"); // Redireciona para o login se não autenticado
      } else {
        setLoading(false); // Conclui o carregamento se o token existir
      }
    }, [router]);

    // Exibe um indicador de carregamento enquanto verifica o token
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p>Carregando...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};
