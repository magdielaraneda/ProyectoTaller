import axios from "./root.service";

/**
 * Crea un nuevo usuario.
 * @param {Object} userData - Datos del usuario a crear.
 * @returns {Object} - Datos del usuario creado.
 */
export const createUserService = async (userData) => {
  const response = await axios.post('/users', userData);
  return response.data;
};

/**
 * Obtiene todos los usuarios.
 * @returns {Array} - Lista de usuarios.
 */
export const getUsersService = async () => {
  try {
    const response = await axios.get("/users");
    // Manejo de diferentes formatos de respuesta desde el backend
    if (response.data && Array.isArray(response.data)) {
      return response.data; // Si es un array directamente.
    } else if (response.data && response.data.data) {
      return response.data.data; // Si los datos están anidados en 'data'.
    } else {
      throw new Error("Formato de respuesta inesperado");
    }
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

/**
 * Elimina un usuario por su ID.
 * @param {string} userId - ID del usuario a eliminar.
 * @returns {Object} - Confirmación de eliminación.
 */
export const deleteUserService = async (userId) => {
  try {
    const response = await axios.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || `Error al eliminar el usuario con ID ${userId}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// Exporta las funciones para su uso en otros componentes
export default {
  createUserService,
  getUsersService,
  deleteUserService,
};
