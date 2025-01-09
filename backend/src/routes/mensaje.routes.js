import express from "express";
import {
  crearMensaje,
  obtenerMensajesPorUsuario,
} from "../controllers/mensaje.controller.js";

const router = express.Router();

// Crear un nuevo mensaje
router.post("/", crearMensaje);

// Obtener mensajes entre dos usuarios
router.get("/:userId/:receiverId", obtenerMensajesPorUsuario);

export default router;
