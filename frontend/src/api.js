import axios from "axios";

const API = axios.create({
  baseURL: "https://taskify-backend-hsac.onrender.com",
  withCredentials: true,
});

export default API;
