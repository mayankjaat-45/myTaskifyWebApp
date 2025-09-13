// src/api/API.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use environment variable
  withCredentials: true, // Send cookies
});

export default API;
