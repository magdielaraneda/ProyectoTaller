import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../services/socket.service'; // Importar configuración de Socket.IO

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      console.log("Usuario almacenado en localStorage al iniciar:", storedUser);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error al cargar el usuario desde localStorage:", error);
      return null;
    }
  });

  const navigate = useNavigate();
  const isAuthenticated = !!user;

  const validateUserData = (userData) => {
    console.log("Validando datos del usuario:", userData);
    if (!userData || typeof userData !== 'object') {
      console.error("Datos de usuario inválidos:", userData);
      return false;
    }

    if (!userData.id || typeof userData.id !== 'string') {
      console.error("El usuario no tiene un ID válido:", userData);
      return false;
    }

    if (!userData.roles || !Array.isArray(userData.roles) || userData.roles.length === 0) {
      console.error("El usuario no tiene roles válidos:", userData);
      return false;
    }

    return true;
  };

  const loginUser = (userData) => {
    console.log("Datos del usuario recibidos en loginUser:", userData);
    if (!validateUserData(userData)) {
      console.error("No se puede iniciar sesión con datos inválidos.");
      return;
    }

    // Configurar usuario autenticado
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));

    // Conectar al servidor de Socket.IO y registrar al usuario
    socket.connect();
    socket.emit('registrarUsuario', userData.id);
    console.log("Usuario conectado y registrado en el socket.");
  };

  const logoutUser = () => {
    console.log("Cerrando sesión del usuario.");
    setUser(null);
    localStorage.removeItem('user');

    // Desconectar del servidor de Socket.IO
    if (socket.connected) {
      socket.disconnect();
      console.log("Socket desconectado.");
    }

    navigate('/auth');
  };

  useEffect(() => {
    console.log("Usuario actual en el AuthContext:", user);

    if (!isAuthenticated && !user) {
      console.warn("El usuario no está autenticado. Redirigiendo a /auth...");
      navigate('/auth');
    }

    // Desconectar socket al desmontar el contexto
    return () => {
      if (socket.connected) {
        socket.disconnect();
        console.log("Socket desconectado al desmontar el contexto.");
      }
    };
  }, [isAuthenticated, navigate, user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
