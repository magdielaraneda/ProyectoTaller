import axios from "axios";
import cookies from "js-cookie";

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get("jwt-auth");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token incluido en la solicitud:", token);
    } else {
      console.log("No se encontró token JWT.");
    }
    console.log("Configuración de la solicitud:", config);
    return config;
  },
  (error) => {
    console.error("Error en el interceptor de solicitud:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error detectado en la respuesta:", error);
    if (error.response) {
      console.error(
        `Error en la respuesta: ${error.response.status} - ${error.response.data?.message || error.message}`
      );
      if (error.response.status === 401) {
        console.log("Token expirado, redirigiendo al login.");
        cookies.remove("jwt-auth");
        window.location.href = "/auth";
      }
    } else {
      console.error("Error de red:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
