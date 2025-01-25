// services/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_BACKEND_URL, // Coloque a URL completa do seu backend Django aqui
  timeout: 10000, // Tempo limite de requisição (opcional)
});

export default axiosInstance;
