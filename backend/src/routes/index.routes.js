"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import servicioRoutes from "./servicios.routes.js";
import reservacionRoutes from "./reservas.routes.js";
import reporteRoutes from "./reporte.routes.js";
import encuestaRoutes from "./encuesta.routes.js";
import mensajeRoutes from "./mensaje.routes.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/mensajes", mensajeRoutes);
router.use("/reservaciones", reservacionRoutes);
router.use("/encuesta", encuestaRoutes);
router.use("/servicios", servicioRoutes);
router.use("/reportes", authenticationMiddleware, reporteRoutes);
router.use("*", (req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    message: `La ruta ${req.originalUrl} no está definida.`,
  });
});

export default router;
