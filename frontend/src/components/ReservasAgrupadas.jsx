import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { obtenerReservacionesAgrupadas, eliminarReservaPorId } from "../services/reserva.service";

function ReservasAgrupadas() {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("en proceso"); // Mostrar "en proceso" por defecto
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const dataReservas = await obtenerReservacionesAgrupadas();
        console.log("Estructura de las reservas obtenidas:", dataReservas); // Verifica la estructura de cada reserva
        setReservas(dataReservas);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setError("Error al cargar datos.");
      }
    };

    fetchReservas();
  }, []);

  const handleEliminarReserva = async (reservacionId, reservaInfo) => {
    const result = await Swal.fire({
      title: "¿Estás seguro de eliminar esta reservación?",
      html: `
        <p><strong>Cliente:</strong> ${reservaInfo.clienteNombre}</p>
        <p><strong>Servicio:</strong> ${reservaInfo.nombreServicio}</p>
        <p><strong>Fecha y hora:</strong> ${new Date(reservaInfo.horario).toLocaleString()}</p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await eliminarReservaPorId(reservacionId);
        Swal.fire({
          icon: "success",
          title: "¡Reservación eliminada!",
          text: "La reservación ha sido eliminada con éxito.",
        });

        setReservas((prevReservas) =>
          prevReservas.map((grupo) => ({
            ...grupo,
            categorias: grupo.categorias.map((categoria) => ({
              ...categoria,
              reservas: categoria.reservas.filter((reserva) => reserva._id !== reservacionId),
            })),
          }))
        );
      } catch (error) {
        console.error("Error al eliminar reserva:", error);
        Swal.fire({
          icon: "error",
          title: "Error al eliminar reservación",
          text: "No se pudo eliminar la reservación. Por favor, inténtalo de nuevo.",
        });
      }
    }
  };

  const handleVerReporte = (reserva) => {
    if (reserva.reporteId) {
      navigate(`/detallesReporte/${reserva.reporteId}`);
    } else {
      Swal.fire({
        icon: "info",
        title: "Reporte no disponible",
        text: "El reporte aún no está disponible para esta reservación.",
      });
    }
  };

  const renderReservasPorEstado = () => {
    // Filtra las reservas según el estado seleccionado
    const reservasFiltradas = reservas
      .flatMap((grupo) => grupo.categorias.flatMap((categoria) => categoria.reservas))
      .filter((reserva) => reserva.estado === selectedState);

    console.log("Reservas filtradas por estado:", reservasFiltradas); // Verifica las reservas filtradas

    return reservasFiltradas.map((reserva) => (
      <div
        key={reserva._id}
        className="bg-white shadow-lg rounded-lg p-4 mb-4 relative"
      >
        <button
          className="absolute top-2 right-2 text-sm text-red-600 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center"
          onClick={() => handleEliminarReserva(reserva._id, reserva)}
        >
          ×
        </button>
        <p className="font-semibold text-sm">Cliente: {reserva.clienteNombre}</p>
        <p className="text-sm">Servicio: {reserva.nombreServicio}</p>
        <p className="text-sm">Hora: {new Date(reserva.horario).toLocaleTimeString()}</p>
        <p className="text-sm">
          Colaborador: {reserva.colaborador?.username || "No asignado"}
        </p>
        {selectedState === "completada" && (
          <button
            className="bg-green-500 text-white text-sm px-4 py-2 rounded mt-2 w-full"
            onClick={() => handleVerReporte(reserva)}
          >
            Ver Reporte
          </button>
        )}
      </div>
    ));
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="container mx-auto py-8">
        <header className="bg-gray-800 py-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Reservas Agrupadas</h1>
            <p className="mt-2 text-lg text-gray-300">
              Accede a todas las reservas por su categoría
            </p>
          </div>
        </header>
        <div className="grid grid-cols-2 gap-6 mb-8">
          {["en proceso", "completada"].map((estado) => (
            <button
              key={estado}
              className={`text-center p-4 font-semibold text-white rounded-md ${
                selectedState === estado ? "bg-blue-600" : "bg-gray-400"
              }`}
              onClick={() => setSelectedState(estado)}
            >
              {estado.charAt(0).toUpperCase() + estado.slice(1)}
            </button>
          ))}
        </div>
        <div>{renderReservasPorEstado()}</div>
      </div>
    </div>
  );
}

export default ReservasAgrupadas;
