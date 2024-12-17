import { useState } from "react";
import { enviarEncuesta } from "../services/encuesta.service";
import { showSuccessNotification, showErrorNotification } from "../helpers/swaHelper";

function EnviarEncuesta() {
  const [reservacionId, setReservacionId] = useState("");
  const [clasificacion, setClasificacion] = useState("");
  const [comentario, setComentario] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await enviarEncuesta({ reservacionId, clasificacion, comentario });
      showSuccessNotification("Encuesta enviada con éxito");
      setReservacionId("");
      setClasificacion("");
      setComentario("");
    } catch (error) {
      console.error("Error al enviar la encuesta:", error);
      showErrorNotification("Error al enviar la encuesta. Inténtalo nuevamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enviar Encuesta</h2>
      <input
        type="text"
        value={reservacionId}
        onChange={(e) => setReservacionId(e.target.value)}
        placeholder="ID de la reservación"
        required
      />
      <input
        type="number"
        value={clasificacion}
        onChange={(e) => setClasificacion(e.target.value)}
        placeholder="Clasificación (1-5)"
        required
      />
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Comentario"
      ></textarea>
      <button type="submit">Enviar Encuesta</button>
    </form>
  );
}

export default EnviarEncuesta;
