import { useEffect, useState } from "react";
import { obtenerReservas, asignarColaborador, eliminarReservaPorId } from "../services/reserva.service";
import { useNavigate } from "react-router-dom";

const Reservaciones = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await obtenerReservas();
        setReservaciones(data);
      } catch (error) {
        console.error("Error al obtener reservaciones:", error);
      }
    };

    const fetchColaboradores = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/colaboradores", {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt-auth")}` },
        });
        const data = await response.json();
        setColaboradores(data);
      } catch (error) {
        console.error("Error al obtener colaboradores:", error);
      }
    };

    fetchReservas();
    fetchColaboradores();
  }, []);

  const handleAsignarColaborador = async (reservacionId, colaboradorId) => {
    try {
      await asignarColaborador(reservacionId, colaboradorId);
      setMensaje("Colaborador asignado exitosamente.");
      setReservaciones((prev) =>
        prev.map((reserva) =>
          reserva._id === reservacionId ? { ...reserva, estado: "asignado" } : reserva
        )
      );
    } catch (error) {
      console.error("Error al asignar colaborador:", error);
      setMensaje("Error al asignar colaborador.");
    }
  };

  const handleEliminar = async (reservacionId) => {
    try {
      await eliminarReservaPorId(reservacionId);
      setReservaciones((prev) => prev.filter((reserva) => reserva._id !== reservacionId));
    } catch (error) {
      console.error("Error al eliminar reservación:", error);
    }
  };

  const handleVerReporte = (reservacionId) => {
    navigate(`/detallesReporte/${reservacionId}`);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Reservaciones</h1>
      {mensaje && <p className="text-green-500">{mensaje}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reservaciones.map((reserva) => (
          <div key={reserva._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-bold">{reserva.clienteNombre}</h3>
            <p><strong>Estado:</strong> {reserva.estado}</p>
            <p><strong>Servicio:</strong> {reserva.nombreServicio}</p>
            <p><strong>Horario:</strong> {new Date(reserva.horario).toLocaleString()}</p>
            {reserva.estado === "pendiente" && (
              <>
                <select
                  onChange={(e) => handleAsignarColaborador(reserva._id, e.target.value)}
                  className="mt-2 p-2 border rounded w-full"
                >
                  <option value="">Seleccionar colaborador</option>
                  {colaboradores.map((colaborador) => (
                    <option key={colaborador._id} value={colaborador._id}>
                      {colaborador.username}
                    </option>
                  ))}
                </select>
              </>
            )}
            {reserva.estado === "asignado" && (
              <button
                onClick={() => handleEliminar(reserva._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Eliminar
              </button>
            )}
            {reserva.estado === "completado" && (
              <button
                onClick={() => handleVerReporte(reserva._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Ver Reporte
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservaciones;
