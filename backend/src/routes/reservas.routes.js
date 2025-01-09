import express from "express";
import {
  crearReservacion,
  obtenerReservacionesAgrupadasPorFechaYCategoria,
  eliminarReservacion,
  obtenerReservasPorColaborador,
  obtenerReservacionPorId,
  obtenerColaboradoresDisponibles,
  obtenerColaboradoresPorServicio,
  obtenerHorarioColaborador,
  cancelarReservacion,
} from "../controllers/reservas.controller.js";
import verifyJWT from "../middlewares/authentication.middleware.js";


const router = express.Router();


router.get("/colaboradores/horario", obtenerHorarioColaborador);
router.get("/disponibles", obtenerColaboradoresDisponibles); // Ruta específica primero
router.get("/agrupadas", verifyJWT, obtenerReservacionesAgrupadasPorFechaYCategoria);
router.get("/colaborador/:id", verifyJWT, obtenerReservasPorColaborador);
router.get("/:id", verifyJWT, obtenerReservacionPorId); // Ruta dinámica al final
router.post("/", crearReservacion);
router.get("/cancelar/:id", cancelarReservacion);
router.get("/colaboradores/por-servicio", obtenerColaboradoresPorServicio);
router.delete("/:id", verifyJWT, eliminarReservacion);

export default router;
