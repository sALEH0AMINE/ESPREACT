import axios from "axios";

const API_URL = "http://172.17.163.69:5001/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Maybe redirect to login...");
        // Optionally, you can clear localStorage or perform other actions here
    }
    return Promise.reject(error);
  }
);

export default api;
