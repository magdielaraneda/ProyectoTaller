import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import path from "path";
import { setupDB } from "./config/db.config.js";
import { createRoles, createUsers } from "./config/initialSetup.js";
import indexRoutes from "./routes/index.routes.js";
import Mensaje from "./models/mensaje.model.js";
import User from "./models/user.model.js";
import { fileURLToPath } from "url";

const app = express();
const httpServer = createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  "https://frontend-cls3optl0-magdielaranedas-projects.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS no autorizado para este origen."));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", indexRoutes);

export const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  },
});

const usuariosConectados = {};

io.on("connection", (socket) => {
  console.log("Un usuario conectado:", socket.id);

  socket.on("registrarUsuario", async (userId) => {
    usuariosConectados[userId] = socket.id;
    console.log(`Usuario ${userId} vinculado al socket ${socket.id}`);

    const usuarios = await User.find({}, "_id username"); // Solo devuelve _id y username
    io.emit("usuariosConectados", {
      conectados: Object.keys(usuariosConectados), // Lista de IDs conectados
      usuarios, // Lista de todos los usuarios
    });
  });

  socket.on("mensaje", async (data) => {
    const { senderId, receiverId, content } = data;
    try {
      if (!senderId || !receiverId || !content) {
        return socket.emit("error", { message: "Datos incompletos" });
      }

      // Obtenemos el usuario emisor
      const sender = await User.findById(senderId, "username");
      if (!sender) {
        return socket.emit("error", { message: "Usuario emisor no encontrado" });
      }

      // Creamos el mensaje en la base de datos
      const mensaje = await Mensaje.create({ senderId, receiverId, content });

      // Enviamos el mensaje al receptor si está conectado
      const receptorSocketId = usuariosConectados[receiverId];
      if (receptorSocketId) {
        io.to(receptorSocketId).emit("nuevoMensaje", {
          senderId: mensaje.senderId,
          senderUsername: sender.username, // Incluimos el username del emisor
          receiverId: mensaje.receiverId,
          content: mensaje.content,
        });
      }
    } catch (error) {
      console.error("Error al guardar el mensaje:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
    for (const [userId, socketId] of Object.entries(usuariosConectados)) {
      if (socketId === socket.id) {
        delete usuariosConectados[userId];
        console.log(`Usuario ${userId} eliminado de la lista.`);
      }
    }
    io.emit("usuariosConectados", Object.keys(usuariosConectados));
  });
});

const startServer = async () => {
  try {
    await setupDB();
    console.log("Conexión a la base de datos establecida");
    await createRoles();
    await createUsers();
    console.log("Roles y usuarios iniciales creados");
    httpServer.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000");
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
    process.exit(1);
  }
};

startServer();

app._router.stack
  .filter((r) => r.route)
  .map((r) => ({
    path: r.route.path,
    methods: Object.keys(r.route.methods),
  }))
  .forEach((route) => console.log(route));

export { app, httpServer };
