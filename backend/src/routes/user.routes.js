"use strict";
import { Router } from "express";
import { getUsers, deleteUser, obtenerColaboradores, getUserById } from "../controllers/user.controller.js";
import {
  isAdmin,
  isGerente,
  esColaborador,
  esCliente,
} from "../middlewares/authorization.middleware.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";
import { createUsers } from "../config/initialSetup.js";

const router = Router();

// Ruta para obtener todos los usuarios
router.get("/", getUsers);

// Ruta para obtener colaboradores
router.get("/colaboradores", obtenerColaboradores);

// Ruta para obtener un usuario por ID
router.get("/:id", getUserById);

// Middleware de autenticación para las rutas protegidas
router.use(authenticationMiddleware);

// Ruta para crear usuarios (protegida para administradores)
router.post("/", isAdmin, createUsers);

// Ruta para actualizar un usuario (protegida para administradores)
router.put("/users/:id", isAdmin, (req, res) => {
  res.json({ message: "Usuario actualizado" });
});

// Ruta para eliminar un usuario por ID (protegida para administradores)
router.delete("/:id", isAdmin, deleteUser);

// Ruta para obtener notificaciones (protegida para colaboradores)
router.get("/notificaciones", esColaborador, (req, res) => {
  res.json({ message: "Notificaciones del usuario" });
});

// Ruta para gerentes
router.get("/gerentes", isGerente, (req, res) => {
  res.json({ message: "Bienvenido, gerente" });
});

// Ruta para clientes
router.get("/clientes", esCliente, (req, res) => {
  res.json({ message: "Bienvenido, cliente" });
});

export default router;
