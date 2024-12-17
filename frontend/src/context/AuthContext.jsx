import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error al cargar el usuario desde localStorage:", error);
      return null;
    }
  });

  const navigate = useNavigate();
  const isAuthenticated = !!user;

  const validateUserData = (userData) => {
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
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  


  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/auth');
  };

  useEffect(() => {
    console.log("Usuario actual en el AuthContext:", user);
    if (!isAuthenticated) {
      console.warn("El usuario no está autenticado.");
      navigate('/auth');
    }
  }, [isAuthenticated, navigate, user]);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
