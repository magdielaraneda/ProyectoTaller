import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerEncuestas, eliminarEncuesta } from "../services/encuesta.service";
import { showSuccessNotification, showErrorNotification } from "../helpers/swaHelper";

function DetallesEncuesta() {
  const { id } = useParams();
  const [encuesta, setEncuesta] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEncuesta = async () => {
      try {
        const data = await obtenerEncuestas(id);
        setEncuesta(data);
      } catch (error) {
        console.error("Error al obtener la encuesta:", error);
        setError("Error al obtener la encuesta.");
      }
    };

    fetchEncuesta();
  }, [id]);

  const handleEliminarEncuesta = async () => {
    try {
      await eliminarEncuesta(id);
      showSuccessNotification("Encuesta eliminada con éxito");
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar la encuesta:", error);
      showErrorNotification("Error al eliminar la encuesta.");
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!encuesta) return <div>Cargando encuesta...</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Detalles de Encuesta</h2>
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
        <p><strong>Clasificación:</strong> {encuesta.clasificacion}</p>
        <p><strong>Comentario:</strong> {encuesta.comentario}</p>
        <p><strong>Reservación ID:</strong> {encuesta.reservacionId}</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleEliminarEncuesta}
        >
          Eliminar Encuesta
        </button>
      </div>
    </div>
  );
}

export default DetallesEncuesta;
