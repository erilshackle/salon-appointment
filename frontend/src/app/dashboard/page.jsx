"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const token = Cookies.get("access_token");

  useEffect(() => {
    if (!token) {
      redirect("/login");
    } else {
      // Chamada à API com autenticação
      api
        .get("/api/your-protected-route/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setData(res.data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  return (
    <div>
      <h1>Dashboard</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Carregando..."}
    </div>
  );
}
