import Mensaje from "../models/mensaje.model.js";

// Crear un nuevo mensaje
export const crearMensaje = async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    const nuevoMensaje = await Mensaje.create({ senderId, receiverId, content });
    res.status(201).json(nuevoMensaje);
  } catch (error) {
    res.status(500).json({ message: "Error al crear mensaje", error });
  }
};

export const obtenerMensajesPorUsuario = async (req, res) => {
  const { userId, receiverId } = req.params;

  try {
    const mensajes = await Mensaje.find({
      $or: [
        { senderId: userId, receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    })
      .populate("senderId", "username") // Poblar username del remitente
      .populate("receiverId", "username") // Poblar username del receptor
      .sort({ createdAt: 1 }); // Ordenar por fecha de creación ascendente

    res.status(200).json(mensajes);
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
    res.status(500).json({ error: "Error al obtener mensajes" });
  }
};

