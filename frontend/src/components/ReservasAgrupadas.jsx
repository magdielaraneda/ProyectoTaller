import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  obtenerReservacionesAgrupadas,
  asignarColaborador,
  obtenerColaboradores,
  eliminarReservaPorId,
} from "../services/reserva.service";

function ReservasAgrupadas() {
  const [reservas, setReservas] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservasYColaboradores = async () => {
      try {
        const dataReservas = await obtenerReservacionesAgrupadas();
        const dataColaboradores = await obtenerColaboradores();
        setReservas(dataReservas);
        setColaboradores(dataColaboradores);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setError("Error al cargar datos.");
      }
    };

    fetchReservasYColaboradores();
  }, []);

  const handleAsignarColaborador = async (reservacionId, colaboradorId) => {
    if (!colaboradorId) return;
    try {
      await asignarColaborador(reservacionId, colaboradorId);
      Swal.fire({
        icon: "success",
        title: "¡Colaborador asignado!",
        text: "El colaborador ha sido asignado con éxito a la reservación.",
      });

      const updatedReservas = reservas.map((grupo) => ({
        ...grupo,
        categorias: grupo.categorias.map((categoria) => ({
          ...categoria,
          reservas: categoria.reservas.map((reserva) =>
            reserva._id === reservacionId
              ? { ...reserva, estado: "asignado" }
              : reserva
          ),
        })),
      }));
      setReservas(updatedReservas);
    } catch (error) {
      console.error("Error al asignar colaborador:", error);
      Swal.fire({
        icon: "error",
        title: "Error al asignar colaborador",
        text: "No se pudo asignar el colaborador. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const handleEliminarReserva = async (reservacionId, reservaInfo) => {
    const result = await Swal.fire({
      title: "¿Estás seguro de eliminar esta reservación?",
      html: `
        <p><strong>Cliente:</strong> ${reservaInfo.clienteNombre}</p>
        <p><strong>Servicio:</strong> ${reservaInfo.nombreServicio}</p>
        <p><strong>Fecha y hora:</strong> ${new Date(
          reservaInfo.horario
        ).toLocaleString()}</p>
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

        const updatedReservas = reservas.map((grupo) => ({
          ...grupo,
          categorias: grupo.categorias.map((categoria) => ({
            ...categoria,
            reservas: categoria.reservas.filter(
              (reserva) => reserva._id !== reservacionId
            ),
          })),
        }));
        setReservas(updatedReservas);
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

  const renderReservasPorEstado = (estado) => {
    return reservas
      .filter((grupo) =>
        grupo.categorias.some((cat) =>
          cat.reservas.some((res) => res.estado === estado)
        )
      )
      .flatMap((grupo) =>
        grupo.categorias.flatMap((categoria) =>
          categoria.reservas
            .filter((reserva) => reserva.estado === estado)
            .sort((a, b) => new Date(a.horario) - new Date(b.horario))
            .map((reserva) => (
              <div
                key={reserva._id}
                className="bg-white shadow-lg rounded-lg p-4 mb-4 relative"
                onClick={(e) => e.stopPropagation()}
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
                {estado === "pendiente" && (
                  <div>
                    <select
                      className="border rounded px-2 py-1 w-full mt-2 text-sm"
                      defaultValue=""
                      onChange={(e) =>
                        handleAsignarColaborador(reserva._id, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Seleccionar colaborador
                      </option>
                      {colaboradores.map((colaborador) => (
                        <option key={colaborador._id} value={colaborador._id}>
                          {colaborador.username}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {estado === "completado" && (
                  <button
                    className="bg-green-500 text-white text-sm px-4 py-2 rounded mt-2 w-full"
                    onClick={() => handleVerReporte(reserva)}
                  >
                    Ver Reporte
                  </button>
                )}
              </div>
            ))
        )
      );
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["pendiente", "asignado", "completado"].map((estado) => (
            <div
              key={estado}
              className={`cursor-pointer bg-gray-100 hover:bg-gray-200 shadow-md hover:shadow-xl rounded-lg text-center p-6 ${
                selectedState === estado ? "bg-blue-100" : ""
              }`}
              onClick={() =>
                selectedState === estado
                  ? setSelectedState("")
                  : setSelectedState(estado)
              }
            >
              <h2 className="text-xl font-semibold capitalize mb-4 text-white bg-blue-600 rounded py-2">
                {estado}
              </h2>
              {selectedState === estado && (
                <div className="overflow-y-auto max-h-96">
                  {renderReservasPorEstado(estado)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReservasAgrupadas;
