import jwt from "jsonwebtoken";
import { ACCESS_JWT_SECRET } from "../config/env.config.js";
import { respondError } from "../utils/resHandler.js";

// Lista de rutas públicas que no requieren autenticación
const rutasPublicas = ["/api/reservaciones/disponibles"];

const verifyJWT = (req, res, next) => {
  try {
    // Permitir el acceso a las rutas públicas sin token
    if (rutasPublicas.includes(req.originalUrl)) {
      return next();
    }

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return respondError(req, res, 401, "No autorizado. Token no proporcionado.");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, ACCESS_JWT_SECRET, (err, decoded) => {
      if (err) {
        return respondError(req, res, 403, "Token inválido o expirado.");
      }

      req.user = {
        id: decoded.userId,
        email: decoded.email,
        roles: decoded.roles,
      };
      next();
    });
  } catch (error) {
    console.error("Error en authentication.middleware -> verifyJWT:", error.message);
    respondError(req, res, 500, "Error interno en la autenticación.");
  }
};

export default verifyJWT;
