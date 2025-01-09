import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { enviarEncuesta } from "../services/encuesta.service";
import { showSuccessNotification, showErrorNotification } from "../helpers/swaHelper";

function EnviarEncuesta() {
  const { reservacionId } = useParams();
  const navigate = useNavigate();
  const [clasificacion, setClasificacion] = useState(0);
  const [comentario, setComentario] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!reservacionId) {
      showErrorNotification("No se encontró una reservación válida para responder la encuesta.");
      return;
    }
  
    try {
      await enviarEncuesta({ reservacionId, clasificacion, comentario });
      showSuccessNotification("Encuesta enviada con éxito");
      setClasificacion(0);
      setComentario("");
      navigate("/");
    } catch (error) {
      // Mostrar el mensaje de error del backend en la notificación
      console.error("Error al enviar la encuesta:", error);
      showErrorNotification(error.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Responder Encuesta</h2>
      <div className="mb-4">
        <label htmlFor="clasificacion" className="block text-sm font-medium text-gray-700">
          Clasificación
        </label>
        <div className="flex items-center space-x-2 mt-2">
          {[1, 2, 3, 4, 5, 6, 7].map((valor) => (
            <button
              type="button"
              key={valor}
              className={`px-3 py-1 rounded-full border ${
                clasificacion === valor ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setClasificacion(valor)}
            >
              {valor}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="comentario" className="block text-sm font-medium text-gray-700">
          Comentario
        </label>
        <textarea
          id="comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Aquí agrega un comentario del servicio..."
          className="block w-full border border-gray-300 rounded-md p-2"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Enviar Encuesta
      </button>
    </form>
  );
}

export default EnviarEncuesta;
