import { useState, useEffect } from "react";
import {
  obtenerEncuestas,
  eliminarEncuesta,
} from "../services/encuesta.service";
import {obtenerColaboradores} from "../services/reserva.service"
import { showSuccessNotification, showErrorNotification } from "../helpers/swaHelper";

function DetallesEncuestas() {
  const [encuestas, setEncuestas] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState("todos");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dataEncuestas, dataColaboradores] = await Promise.all([
          obtenerEncuestas(),
          obtenerColaboradores(),
        ]);
        setEncuestas(dataEncuestas);
        setColaboradores([{ _id: "todos", username: "Todos" }, ...dataColaboradores]);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setError("Error al cargar los datos.");
      }
    };

    fetchData();
  }, []);

  const handleEliminarEncuesta = async (id) => {
    try {
      await eliminarEncuesta(id);
      showSuccessNotification("Encuesta eliminada con éxito");
      setEncuestas((prevEncuestas) => prevEncuestas.filter((encuesta) => encuesta._id !== id));
    } catch (error) {
      console.error("Error al eliminar la encuesta:", error);
      showErrorNotification("Error al eliminar la encuesta.");
    }
  };

  const getNotaClass = (clasificacion) => {
    if (clasificacion >= 1 && clasificacion <= 3) {
      return "text-red-500 bg-red-100";
    } else if (clasificacion >= 4 && clasificacion <= 7) {
      return "text-green-500 bg-green-100";
    }
    return "text-gray-500 bg-gray-100";
  };

  const encuestasFiltradas =
    colaboradorSeleccionado === "todos"
      ? encuestas
      : encuestas.filter(
          (encuesta) =>
            encuesta.reservacionId?.colaboradorId?._id === colaboradorSeleccionado
        );

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Lista de Encuestas</h2>
      <div className="mb-6">
        <label htmlFor="colaborador" className="block font-semibold text-gray-700 mb-2">
          Filtrar por Colaborador:
        </label>
        <select
          id="colaborador"
          value={colaboradorSeleccionado}
          onChange={(e) => setColaboradorSeleccionado(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          {colaboradores.map((colaborador) => (
            <option key={colaborador._id} value={colaborador._id}>
              {colaborador.username}
            </option>
          ))}
        </select>
      </div>
      {encuestasFiltradas.length === 0 ? (
        <div className="text-gray-500">No hay encuestas disponibles para este colaborador.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {encuestasFiltradas.map((encuesta) => (
            <div
              key={encuesta._id}
              className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 relative"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                {encuesta.reservacionId?.colaboradorId?.username || "Colaborador no asignado"}
              </h3>
              <div
                className={`absolute top-2 right-2 text-lg font-bold px-3 py-1 rounded-full ${getNotaClass(
                  encuesta.clasificacion
                )}`}
              >
                {encuesta.clasificacion}
              </div>
              <p>
                <strong>Comentario:</strong> {encuesta.comentario || "Sin comentario"}
              </p>
              <p>
                <strong>Cliente:</strong> {encuesta.reservacionId?.clienteNombre || "No disponible"}
              </p>
              <p>
                <strong>Correo Cliente:</strong> {encuesta.reservacionId?.clienteEmail || "No disponible"}
              </p>
              <p>
                <strong>Fecha Reserva:</strong>{" "}
                {encuesta.reservacionId?.horario
                  ? new Date(encuesta.reservacionId.horario).toLocaleString()
                  : "Sin fecha"}
              </p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600 transition-colors"
                onClick={() => handleEliminarEncuesta(encuesta._id)}
              >
                Eliminar Encuesta
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DetallesEncuestas;