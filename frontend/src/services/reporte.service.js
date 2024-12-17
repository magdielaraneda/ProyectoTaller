import axios from "./root.service";

/**
 * Crear un nuevo reporte
 * @param {FormData} reporteData - Datos del reporte en formato FormData
 * @returns {Object} - Reporte creado
 * @throws {Error} - Lanza un error si la solicitud falla
 */
export const crearReporte = async (reporteData) => {
  try {
    const res = await axios.post("/reportes", reporteData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Error desconocido al crear el reporte";
    throw new Error(errorMessage);
  }
};
/**
 * Actualizar un reporte existente
 * @param {string} id - ID del reporte
 * @param {Object} reporteData - Datos actualizados del reporte
 * @returns {Object} - Reporte actualizado
 * @throws {Error} - Lanza un error si la solicitud falla
 */
export const actualizarReporte = async (id, reporteData) => {
  try {
    const res = await axios.put(`/reportes/${id}`, reporteData);
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Error desconocido al actualizar el reporte";
    throw new Error(errorMessage);
  }
};

/**
 * Obtener todos los reportes completados
 * @returns {Array} - Lista de reportes completados
 * @throws {Error} - Lanza un error si la solicitud falla
 */
export const obtenerReportesCompletados = async () => {
  try {
    const res = await axios.get("/reportes/completados");
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Error desconocido al obtener los reportes";
    throw new Error(errorMessage);
  }
};

/**
 * Obtener un reporte por ID
 * @param {string} id - ID del reporte
 * @returns {Object} - Detalles del reporte
 * @throws {Error} - Lanza un error si la solicitud falla
 */
export const obtenerReportePorId = async (id) => {
  try {
    const res = await axios.get(`/reportes/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error desconocido al obtener el reporte");
  }
};


/**
 * Eliminar un reporte por ID
 * @param {string} id - ID del reporte
 * @returns {Object} - Confirmación de eliminación
 * @throws {Error} - Lanza un error si la solicitud falla
 */
export const eliminarReporte = async (id) => {
  try {
    const res = await axios.delete(`/reportes/${id}`);
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Error desconocido al eliminar el reporte";
    throw new Error(errorMessage);
  }
};

export default {
  crearReporte,
  actualizarReporte,
  obtenerReportesCompletados,
  eliminarReporte,
  obtenerReportePorId,
};
