import axios from "./root.service";

/**
 * Obtiene una reserva por su ID.
 * @param {string} idReserva - ID de la reserva
 * @returns {Object} - Reserva encontrada
 */
export const obtenerReservaPorId = async (idReserva) => {
  try {
    const res = await axios.get(`/reservaciones/${idReserva}`);
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      `Error al obtener la reserva con ID ${idReserva}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};


/**
 * Elimina una reserva por su ID.
 * @param {string} idReserva - ID de la reserva a eliminar
 * @returns {Object} - Confirmación de eliminación
 */
export const eliminarReservaPorId = async (idReserva) => {
  try {
    const res = await axios.delete(`/reservaciones/${idReserva}`);
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      `Error al eliminar la reserva con ID ${idReserva}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const asignarColaborador = async (reservacionId, colaboradorId) => {
  try {
    const response = await axios.patch("/reservaciones/asignar", {
      reservacionId,
      colaboradorId,
    });
    return response.data;
  } catch (error) {
    console.error("Error al asignar colaborador:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


/**
 * Crea una nueva reservación.
 * @param {Object} reservaData - Datos de la reservación a crear
 * @returns {Object} - Datos de la reservación creada
 */
export const crearReservacion = async (reservaData) => {
  try {
    const res = await axios.post("/reservaciones", reservaData);
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || "Error desconocido al crear la reservación";
    const errorDetails =
      error.response?.data?.details || "Sin detalles adicionales";
    console.error(
      "Error al crear reservación:",
      errorMessage,
      errorDetails
    );
    throw new Error(`${errorMessage}: ${errorDetails}`);
  }
};

/**
 * Obtener reservaciones asignadas a un colaborador.
 * @param {string} colaboradorId - ID del colaborador.
 * @returns {Array} - Lista de reservaciones.
 */
export const obtenerReservasPorColaborador = async (colaboradorId) => {
  try {
    const response = await axios.get(`/reservaciones/colaborador/${colaboradorId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener reservaciones para el colaborador con ID ${colaboradorId}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Obtener una reservación por su ID
 * @param {string} id - ID de la reservación
 * @returns {Promise<Object>} - Reservación encontrada
 */
export const obtenerReservacionPorId = async (id) => {
  try {
    const response = await axios.get(`/reservaciones/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Error desconocido al obtener la reservación";
    throw new Error(errorMessage);
  }
};

/**
 * Obtiene todas las reservaciones agrupadas por fecha y categoría.
 * @returns {Array} - Lista de reservaciones agrupadas
 */
export const obtenerReservacionesAgrupadas = async () => {
  try {
    const res = await axios.get("/reservaciones/agrupadas");
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      "Error desconocido al obtener reservaciones agrupadas";
    console.error("Error al obtener reservaciones agrupadas:", errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Obtiene todas las reservaciones.
 * @returns {Array} - Lista de reservaciones
 */
export const obtenerReservas = async () => {
  try {
    const res = await axios.get("/reservaciones");
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      "Error desconocido al obtener reservaciones";
    console.error("Error al obtener reservaciones:", errorMessage);
    throw new Error(errorMessage);
  }
};
/**
 * Obtiene todos los colaboradores disponibles
 * @returns {Array} - Lista de colaboradores
 */
export const obtenerColaboradores = async () => {
  try {
    const response = await axios.get('/users/colaboradores');
    return response.data;
  } catch (error) {
    console.error('Error al obtener colaboradores:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export default {
  crearReservacion,
  obtenerReservacionesAgrupadas,
  eliminarReservaPorId,
  obtenerReservaPorId,
  obtenerReservacionPorId,
  obtenerReservasPorColaborador,
  obtenerReservas,
  asignarColaborador,
  obtenerColaboradores,
};
