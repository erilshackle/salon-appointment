import { useEffect, useState } from "react";
import { fetchWithAuth, isAuthenticated } from "../utils/auth";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      fetchWithAuth("http://localhost:8000/api/your-protected-route/")
        .then((res) => setData(res))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Carregando..."}
    </div>
  );
}
