import axios from "./root.service";

/**
 * Enviar una encuesta
 * @param {Object} encuestaData - Datos de la encuesta
 * @returns {Object} - Encuesta creada
 * @throws {Error} - Lanza un error si la solicitud falla
 */
export const enviarEncuesta = async (encuestaData) => {
  try {
    const res = await axios.post("/encuesta", encuestaData); 
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Error desconocido al enviar la encuesta";
    throw new Error(errorMessage);
  }
};

/**
 * Obtener todas las encuestas o una específica por ID
 * @param {string} [id] - ID de la encuesta (opcional)
 * @returns {Array|Object} - Encuestas obtenidas
 * @throws {Error} - Lanza un error si la solicitud falla
 */
export const obtenerEncuestas = async () => {
  try {
    const res = await axios.get("/encuesta");
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Error desconocido al obtener encuestas";
    throw new Error(errorMessage);
  }
};

/**
 * Buscar encuestas por colaborador
 * @param {string} username - Nombre de usuario del colaborador
 * @returns {Array} - Encuestas encontradas
 * @throws {Error} - Lanza un error si la solicitud falla
 */
export const buscarEncuestasPorColaborador = async (username) => {
  try {
    const res = await axios.get(`/encuesta?username=${username}`);
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Error desconocido al buscar encuestas por colaborador";
    throw new Error(errorMessage);
  }
};

/**
 * Eliminar una encuesta por ID
 * @param {string} id - ID de la encuesta
 * @returns {Object} - Confirmación de eliminación
 * @throws {Error} - Lanza un error si la solicitud falla
 */
export const eliminarEncuesta = async (id) => {
  try {
    const res = await axios.delete(`/encuesta/${id}`);
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Error desconocido al eliminar la encuesta";
    throw new Error(errorMessage);
  }
};

export default {
  enviarEncuesta,
  obtenerEncuestas,
  buscarEncuestasPorColaborador,
  eliminarEncuesta,
};
