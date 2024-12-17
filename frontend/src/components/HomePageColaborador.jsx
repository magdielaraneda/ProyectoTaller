import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { obtenerReservasPorColaborador } from "../services/reserva.service";

export default function HomePageColaborador() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reservasAsignadas, setReservasAsignadas] = useState([]);
  const [reservasCompletadas, setReservasCompletadas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      if (!user?.id) {
        console.warn("El usuario no está disponible o no tiene ID.");
        return;
      }

      try {
        console.log("Obteniendo reservas para el colaborador:", user.id);
        const data = await obtenerReservasPorColaborador(user.id);
        const asignadas = data.filter((reserva) => reserva.estado === "asignado");
        const completadas = data.filter((reserva) => reserva.estado === "completado");
        setReservasAsignadas(asignadas);
        setReservasCompletadas(completadas);
      } catch (error) {
        console.error("Error al obtener reservaciones:", error);
        setError("No se pudieron cargar las reservaciones.");
      }
    };

    fetchReservas();
  }, [user]);

  if (!user || !user.roles?.includes("colaborador")) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">
          No tienes permiso para acceder a esta página.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Encabezado */}
      <header className="bg-gray-800 py-10 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Reservas Asignadas y Completadas
          </h1>
          <p className="text-gray-300 mt-2">
            Consulta y gestiona tus reservas.
          </p>
        </div>
      </header>

      {/* Contenido */}
      <main className="container mx-auto mt-8 px-4">
        {error && (
          <p className="text-red-500 text-center text-lg">{error}</p>
        )}

        {/* Reservas Asignadas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Reservas Asignadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reservasAsignadas.length > 0 ? (
              reservasAsignadas.map((reserva) => (
                <div
                  key={reserva._id}
                  className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {reserva.servicioId?.nombre || "Servicio no especificado"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    <strong>Cliente:</strong> {reserva.clienteNombre}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Horario:</strong>{" "}
                    {new Date(reserva.horario).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Estado:</strong> {reserva.estado}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Observaciones:</strong> {reserva.observaciones}
                  </p>
                  <button
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => navigate(`/CrearReporteRoute/${reserva._id}`)}
                  >
                    Crear Reporte
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg">
                No tienes reservaciones asignadas.
              </p>
            )}
          </div>
        </section>

        {/* Reservas Completadas */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Reservas Completadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reservasCompletadas.length > 0 ? (
              reservasCompletadas.map((reserva) => (
                <div
                  key={reserva._id}
                  className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {reserva.servicioId?.nombre || "Servicio no especificado"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    <strong>Cliente:</strong> {reserva.clienteNombre}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Horario:</strong>{" "}
                    {new Date(reserva.horario).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Estado:</strong> {reserva.estado}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Observaciones:</strong> {reserva.observaciones}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg">
                No tienes reservaciones completadas.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
