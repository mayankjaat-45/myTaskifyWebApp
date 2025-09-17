// src/api/API.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend-url.com",
});

// Add token to all requests automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
