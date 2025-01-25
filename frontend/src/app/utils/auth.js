import Cookies from "js-cookie";
import axios from "axios";

export const isAuthenticated = () => {
  const token = Cookies.get("access_token");
  return !!token;
};

export const fetchWithAuth = async (url) => {
  const token = Cookies.get("access_token");

  if (!token) throw new Error("Não autenticado");

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
