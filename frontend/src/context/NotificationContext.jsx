import { createContext, useContext, useState, useEffect } from "react";
import socket from "../services/socket.service";
import { useAuth } from "./AuthContext";

// Crear el contexto
const NotificationContext = createContext();

// Hook para consumir el contexto
export const useNotifications = () => useContext(NotificationContext);

// Provider del contexto
export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notificaciones, setNotificaciones] = useState([]);

  // Efecto para manejar las notificaciones entrantes
  useEffect(() => {
    if (user && user.id) {
      socket.on("notificacion", (mensaje) => {
        if (mensaje && mensaje.sender && mensaje.sender.username) {
          setNotificaciones((prev) => [...prev, mensaje]);
        } else {
          console.warn("Notificación recibida con datos incompletos:", mensaje);
        }
      });
    }

    return () => {
      socket.off("notificacion");
    };
  }, [user]);

  // Función para marcar notificación como leída
  const marcarComoLeida = (index) => {
    setNotificaciones((prev) => prev.filter((_, i) => i !== index));
  };

  // Proveer el contexto
  return (
    <NotificationContext.Provider
      value={{ notificaciones, setNotificaciones, marcarComoLeida }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Exportar el contexto por defecto
export default NotificationContext;
