import axios from "axios";
import { BYPASS_AUTH_LOCAL } from "@/config/devLocal";

// 🌍 Base URL depuis .env
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://172.17.170.2:8081/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});


// 🔐 Interceptor REQUEST (Token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// 🚨 Interceptor RESPONSE (Errors global)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 && !BYPASS_AUTH_LOCAL) {
      // 🔐 token expiré
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    if (status === 500) {
      console.error("Server error");
    }

    return Promise.reject(error);
  }
);

export default api;