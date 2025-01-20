// services/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Coloque a URL completa do seu backend Django aqui
  timeout: 10000, // Tempo limite de requisição (opcional)
});

export default axiosInstance;
