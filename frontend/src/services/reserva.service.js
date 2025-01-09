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
 * Obtiene un colaborador por su ID.
 * @param {string} colaboradorId - ID del colaborador
 * @returns {Object} - Datos del colaborador
 */
export const getColaboradorPorId = async (colaboradorId) => {
  try {
    const response = await axios.get(`/users/${colaboradorId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener colaborador por ID:", error.response?.data || error.message);
    throw error.response?.data || error;
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

/**
 * Obtiene los colaboradores disponibles.
 * @returns {Promise<Array>} - Lista de colaboradores disponibles.
 */
export const obtenerColaboradoresDisponibles = async () => {
  try {
    const response = await axios.get("/reservaciones/disponibles");
    return response.data;
  } catch (error) {
    console.error("Error al obtener colaboradores disponibles:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Asigna un colaborador a una reservación.
 * @param {string} reservacionId - ID de la reservación
 * @param {string} colaboradorId - ID del colaborador
 * @returns {Object} - Confirmación de asignación
 */
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
    
    console.error(
      "Error al crear reservación:",
      errorMessage,
    
    );
    throw new Error(`${errorMessage}`);
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
 * Obtener una reservación por su ID.
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
    console.log("Reservaciones agrupadas:", res.data); // Verifica la estructura aquí
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
    const response = await axios.get("/users/colaboradores");
    return response.data;
  } catch (error) {
    console.error("Error al obtener colaboradores:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Obtiene colaboradores filtrados por servicio.
 * @param {string} servicioId - ID del servicio
 * @returns {Array} - Lista de colaboradores
 */
export const obtenerColaboradoresPorServicio = async (servicioId) => {
  try {
    const response = await axios.get(`/reservaciones/colaboradores/por-servicio?servicioId=${servicioId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener colaboradores por servicio:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Obtiene el horario semanal de un colaborador.
 * @param {string} colaboradorId - ID del colaborador
 * @param {Date} semanaInicio - Fecha de inicio de la semana
 * @returns {Array} - Horario semanal del colaborador
 */
export const getHorarioColaborador = async (colaboradorId, semanaInicio) => {
  try {
    const response = await axios.get(`/reservaciones/colaboradores/horario?colaboradorId=${colaboradorId}&semanaInicio=${semanaInicio.toISOString()}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener horario del colaborador:", error.response?.data || error.message);
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
  obtenerColaboradoresPorServicio,
  getColaboradorPorId,
  getHorarioColaborador,
  obtenerColaboradoresDisponibles,
};
