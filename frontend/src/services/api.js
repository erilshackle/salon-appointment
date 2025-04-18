import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + "/api",
  timeout: 5000, // Opcional: define um tempo limite
});

export default api;
