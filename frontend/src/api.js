// src/api/API.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // gets URL from .env
  withCredentials: true, // include cookies if your backend uses them
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
