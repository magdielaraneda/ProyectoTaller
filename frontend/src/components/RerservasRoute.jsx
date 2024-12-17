import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerReservas, obtenerColaboradores, eliminarReservaPorId, asignarColaborador } from "../services/reserva.service";

function ReservasRoute() {
  const [reservas, setReservas] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState("pendiente");
  const [colaboradores, setColaboradores] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await obtenerReservas();
        setReservas(data);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
        setError("Error al obtener las reservas. Por favor, intenta nuevamente.");
      }
    };

    const fetchColaboradores = async () => {
      try {
        const data = await obtenerColaboradores();
        setColaboradores(data);
      } catch (error) {
        console.error("Error al obtener colaboradores:", error);
        setError("Error al obtener colaboradores. Por favor, intenta nuevamente.");
      }
    };

    fetchReservas();
    fetchColaboradores();
  }, []);

  const handleAsignar = async (reservacionId, colaboradorId) => {
    try {
      await asignarColaborador(reservacionId, colaboradorId);
      setMensaje("Colaborador asignado exitosamente.");
      const updatedReservas = reservas.map((reserva) =>
        reserva._id === reservacionId ? { ...reserva, estado: "asignado", colaboradorId } : reserva
      );
      setReservas(updatedReservas);
    } catch (error) {
      console.error("Error al asignar colaborador:", error);
      setMensaje("Error al asignar colaborador.");
    }
  };

  const handleEliminar = async (reservacionId) => {
    try {
      await eliminarReservaPorId(reservacionId);
      setReservas(reservas.filter((reserva) => reserva._id !== reservacionId));
      setMensaje("Reservación eliminada exitosamente.");
    } catch (error) {
      console.error("Error al eliminar reservación:", error);
      setMensaje("Error al eliminar reservación.");
    }
  };

  const handleVerReporte = (reserva) => {
    if (reserva.reporteId) {
      navigate(`/detallesReporte/${reserva.reporteId}`);
    } else {
      setMensaje("El reporte aún no está disponible para esta reservación.");
    }
  };

  const reservasFiltradas = reservas.filter((reserva) => reserva.estado === estadoFiltro);

  if (error) {
    return <div className="container mx-auto mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Reservaciones</h2>
      <div className="mb-4">
        <button onClick={() => setEstadoFiltro("pendiente")} className="btn">
          Pendientes
        </button>
        <button onClick={() => setEstadoFiltro("asignado")} className="btn">
          Asignadas
        </button>
        <button onClick={() => setEstadoFiltro("completado")} className="btn">
          Completadas
        </button>
      </div>
      {reservasFiltradas.map((reserva) => (
        <div key={reserva._id} className="border p-4 rounded mb-4">
          <h3>{reserva.nombreServicio}</h3>
          <p>Cliente: {reserva.clienteNombre}</p>
          <p>Estado: {reserva.estado}</p>
          {estadoFiltro === "pendiente" && (
            <div>
              <select
                onChange={(e) => handleAsignar(reserva._id, e.target.value)}
                className="mb-2"
              >
                <option value="">Seleccionar colaborador</option>
                {colaboradores.map((colaborador) => (
                  <option key={colaborador._id} value={colaborador._id}>
                    {colaborador.username}
                  </option>
                ))}
              </select>
            </div>
          )}
          {estadoFiltro === "asignado" && (
            <button onClick={() => handleEliminar(reserva._id)} className="btn-danger">
              Eliminar
            </button>
          )}
          {estadoFiltro === "completado" && (
            <button onClick={() => handleVerReporte(reserva)} className="btn-primary">
              Ver Reporte
            </button>
          )}
        </div>
      ))}
      {mensaje && <p className="text-green-500">{mensaje}</p>}
    </div>
  );
}

export default ReservasRoute;
