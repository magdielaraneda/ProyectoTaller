import axios from "./root.service";

export const getMessagesService = async (userId, receiverId) => {
  try {
    const { data } = await axios.get(`/mensajes/${userId}/${receiverId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
    throw error;
  }
};

export default { getMessagesService };