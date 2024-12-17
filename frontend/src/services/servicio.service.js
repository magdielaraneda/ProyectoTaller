import axios from "./root.service";

/**
 * Obtener todos los servicios o filtrar por categoría
 * @param {string} [categoria] - Categoría para filtrar los servicios
 * @returns {Array} - Lista de servicios
 * @throws {Error} - Lanza un error si la solicitud falla
 */
export const getServicios = async (categoria) => {
  try {
    const query = categoria ? `?categoria=${categoria}` : "";
    const res = await axios.get(`/servicios${query}`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    throw new Error("No se pudieron obtener los servicios.");
  }
};

/**
 * Crear un nuevo servicio
 * @param {Object} servicioData - Datos del servicio a crear
 * @returns {Object} - Servicio creado
 * @throws {Error} - Lanza un error si la solicitud falla
 */
export const crearServicio = async (servicioData) => {
  try {
    const res = await axios.post("/servicios", servicioData);
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Error desconocido al crear el servicio";
    const errorDetails = error.response?.data?.details || "Sin detalles adicionales";
    console.error("Error al crear el servicio:", errorMessage, errorDetails);
    throw new Error(`${errorMessage}: ${errorDetails}`);
  }
};

/**
 * Obtener un servicio por ID
 * @param {string} id - ID del servicio
 * @returns {Object} - Servicio obtenido
 * @throws {Error} - Lanza un error si la solicitud falla
 */
export const obtenerServicioPorId = async (id) => {
  try {
    const res = await axios.get(`/servicios/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error al obtener servicio con ID ${id}:`, error);
    throw new Error("No se pudo obtener el servicio.");
  }
};

/**
 * Actualizar un servicio por ID
 * @param {string} id - ID del servicio a actualizar
 * @param {Object} servicioData - Datos actualizados del servicio
 * @returns {Object} - Servicio actualizado
 * @throws {Error} - Lanza un error si la solicitud falla
 */
export const actualizarServicio = async (id, servicioData) => {
  try {
    const res = await axios.put(`/servicios/${id}`, servicioData);
    return res.data;
  } catch (error) {
    console.error(`Error al actualizar servicio con ID ${id}:`, error);
    throw new Error("No se pudo actualizar el servicio.");
  }
};

/**
 * Eliminar un servicio por ID
 * @param {string} id - ID del servicio a eliminar
 * @returns {Object} - Confirmación de la eliminación
 * @throws {Error} - Lanza un error si la solicitud falla
 */
export const eliminarServicio = async (id) => {
  try {
    const res = await axios.delete(`/servicios/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error al eliminar servicio con ID ${id}:`, error);
    throw new Error("No se pudo eliminar el servicio.");
  }
};

export default {
  getServicios,
  crearServicio,
  obtenerServicioPorId,
  actualizarServicio,
  eliminarServicio,
};
