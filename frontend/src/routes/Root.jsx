import {} from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { NotificationProvider } from "../context/NotificationContext";
import Navbar from "../components/Navbar";

function Root() {
  return (
    <AuthProvider>
      <NotificationProvider> {/* Agregamos el NotificationProvider */}
        <PageRoot />
      </NotificationProvider>
    </AuthProvider>
  );
}

function PageRoot() {
  return (
    <div>
      <Navbar />
    {/* Componente para mostrar notificaciones */}
      <Outlet />
    </div>
  );
}





export default Root;
