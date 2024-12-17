import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerReservaPorId, eliminarReservaPorId } from "../services/reserva.service";
import { showSuccessNotification, showErrorNotification } from "../helpers/swaHelper";

function DetallesReserva() {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const data = await obtenerReservaPorId(id);
        setReserva(data);
      } catch (error) {
        console.error("Error al obtener la reserva:", error);
        setError("Error al obtener la reserva.");
      }
    };

    fetchReserva();
  }, [id]);

  const handleEliminarReserva = async () => {
    try {
      await eliminarReservaPorId(id);
      showSuccessNotification("Reserva eliminada con éxito");
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
      showErrorNotification("Error al eliminar la reserva.");
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!reserva) return <div>Cargando reserva...</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Detalles de Reserva</h2>
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
        <p><strong>Cliente:</strong> {reserva.clienteNombre}</p>
        <p><strong>Correo:</strong> {reserva.clienteEmail}</p>
        <p><strong>Teléfono:</strong> {reserva.clienteTelefono}</p>
        <p><strong>Dirección:</strong> {reserva.direccionCliente}</p>
        <p><strong>Servicio:</strong> {reserva.nombreServicio}</p>
        <p><strong>Fecha y Hora:</strong> {new Date(reserva.horario).toLocaleString()}</p>
        <p><strong>Estado:</strong> {reserva.estado}</p>
        <p><strong>Observaciones:</strong> {reserva.observaciones}</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleEliminarReserva}
        >
          Eliminar Reserva
        </button>
      </div>
    </div>
  );
}

export default DetallesReserva;
