import 'tailwindcss/tailwind.css';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState(null);

  useEffect(() => {
    if (user && user.roles && user.roles.length > 0) {
      switch (user.roles[0]) {
        case 'admin':
          setNavigation(calloutsAdmin);
          break;

        case 'gerente':
          setNavigation(calloutsGerente);
          break;

        case 'colaborador':
          setNavigation(calloutsColaborador);
          break;

        case 'cliente':
          setNavigation(calloutsCliente);
          break;

        default:
          setNavigation(null);
      }
    } else {
      setNavigation(null);
    }
  }, [user]);

  const calloutsAdmin = [
    {
      id: 'Crear Servicio',
      name: 'Crear Servicio',
      description: 'Crea los Servicios',
      icon: '📝',
      action: () => navigate('/CrearServicioRoute'),
    },
    {
      id: 'VerServicios',
      name: 'Ver Servicios',
      description: 'Edición de Servicios.',
      icon: '📜',
      action: () => navigate('/ServiciosPorCategoria'),
    },
    {
      id: 'CrearUsuarios',
      name: 'Crear Usuarios',
      description: 'Creación de Usuarios.',
      icon: '👤',
      action: () => navigate('/UserFunctionsRoute'),
    },
  ];

  const calloutsGerente = [
    {
      id: 'assign-turnos',
      name: 'Gestión de Reservas',
      description: 'Aquí puedes ver las reservaciones',
      icon: '📆',
      action: () => navigate('/reservasAgrupadas'),
    },
  ];

  const calloutsColaborador = [
    {
      id: 'ReservacionesAsig',
      name: 'Reservaciones Asignadas',
      description: 'Revisar tus reservaciones asignadas.',
      icon: '📆',
      action: () => navigate('/home-colaborador'),
    },
  ];

  const calloutsCliente = [
    {
      id: 'reservas-activas',
      name: 'Reservas Activas',
      description: 'Consultar tus reservas activas.',
      icon: '📅',
      action: () => navigate('/misReservas'),
    },
    {
      id: 'historial-reservas',
      name: 'Historial de Reservas',
      description: 'Ver historial de tus reservas.',
      icon: '📜',
      action: () => navigate('/historialReservas'),
    },
    {
      id: 'enviar-encuesta',
      name: 'Enviar Encuesta',
      description: 'Completar encuestas de satisfacción.',
      icon: '📝',
      action: () => navigate('/encuestas'),
    },
  ];

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* Encabezado */}
      <header className="bg-gray-800 py-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Bienvenido a la Plataforma de Gestión
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            Accede a las herramientas que necesitas para gestionar tus servicios.
          </p>
        </div>
      </header>
      {/* Contenido principal */}
      <main className="flex-grow flex items-center justify-center">
        {navigation &&
          navigation.map((callout) => (
            <div
              key={callout.id}
              className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center text-center w-96 h-72 cursor-pointer" // Contenedor más grande
              onClick={callout.action}
            >
              <div className="text-6xl">{callout.icon}</div>
              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {callout.name}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{callout.description}</p>
              <button className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Ir
              </button>
            </div>
          ))}
      </main>
    </div>
  );
}
