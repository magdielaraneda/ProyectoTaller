import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import socket from "../services/socket.service";
import { getUsersService } from "../services/user.service";
import { getMessagesService } from "../services/mensaje.service";
import { useNotifications } from "../context/NotificationContext";

function Mensajeria() {
  const { user } = useAuth();
  const { notificaciones, setNotificaciones } = useNotifications(); // Usamos el contexto de notificaciones
  const [usuarios, setUsuarios] = useState([]); // Asegúrate de inicializar usuarios
  const [usuariosConectados, setUsuariosConectados] = useState([]);
  const [chatAbierto, setChatAbierto] = useState(null);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await getUsersService();
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else {
          console.error("La respuesta no es un array:", data);
          setUsuarios([]);
        }
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
        setUsuarios([]);
      }
    };

    cargarUsuarios();
  }, []);

  useEffect(() => {
    if (user && user.id) {
      socket.connect();
      socket.emit("registrarUsuario", user.id);

      // Manejar usuarios conectados
      socket.on("usuariosConectados", (data) => {
        setUsuariosConectados(data.conectados || []);
      });

      // Manejar nuevos mensajes
      socket.on("nuevoMensaje", (data) => {
        if (chatAbierto && chatAbierto.receptorId === data.senderId) {
          // Si el mensaje pertenece al chat actualmente abierto, agregarlo
          setChatAbierto((prev) => ({
            ...prev,
            mensajes: [
              ...prev.mensajes,
              {
                ...data,
                senderId: {
                  _id: data.senderId,
                  username: data.senderUsername,
                },
              },
            ],
          }));
        } else {
          // Si no pertenece al chat abierto, agregarlo como notificación
          setNotificaciones((prev) => [
            ...prev,
            {
              id: Date.now(), // ID único para la notificación
              senderUsername: data.senderUsername,
              content: data.content,
            },
          ]);
        }
      });

      return () => {
        socket.disconnect();
        socket.off("usuariosConectados");
        socket.off("nuevoMensaje");
      };
    }
  }, [user, chatAbierto]);

  const handleAbrirChat = async (usuario) => {
    try {
      const mensajes = await getMessagesService(user.id, usuario._id);
      setChatAbierto({
        receptorId: usuario._id,
        username: usuario.username,
        mensajes: mensajes || [],
      });
    } catch (error) {
      console.error("Error al abrir el chat:", error);
    }
  };

  const handleCerrarChat = () => {
    setChatAbierto(null);
  };

  const handleEnviarMensaje = () => {
    if (nuevoMensaje.trim() && chatAbierto) {
      const mensaje = {
        senderId: user.id,
        receiverId: chatAbierto.receptorId,
        content: nuevoMensaje,
      };

      socket.emit("mensaje", mensaje);

      setChatAbierto((prev) => ({
        ...prev,
        mensajes: [
          ...prev.mensajes,
          { ...mensaje, senderId: { _id: user.id, username: "Tú" } },
        ],
      }));

      setNuevoMensaje("");
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-lg text-blue-900 font-semibold mb-4">Usuarios Disponibles</h2>
        <ul>
          {Array.isArray(usuarios) && usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <li
                key={usuario._id}
                className={`cursor-pointer hover:bg-gray-200 p-2 rounded ${
                  Array.isArray(usuariosConectados) &&
                  usuariosConectados.includes(usuario._id)
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
                onClick={() => handleAbrirChat(usuario)}
              >
                {usuario.username}{" "}
                {Array.isArray(usuariosConectados) &&
                  usuariosConectados.includes(usuario._id) &&
                  "(Conectado)"}
              </li>
            ))
          ) : (
            <p>No hay usuarios disponibles</p>
          )}
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        {chatAbierto && (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between bg-blue-500 text-white p-4">
              <h3 className="text-lg font-bold">{chatAbierto.username}</h3>
              <button
                onClick={handleCerrarChat}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Cerrar
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {chatAbierto?.mensajes.map((msg, idx) => (
                <p
                  key={idx}
                  className={`${
                    msg.senderId._id === user.id ? "text-right" : "text-left"
                  } mb-2`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      msg.senderId._id === user.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.senderId._id === user.id
                      ? "Tú"
                      : msg.senderId.username}
                    : {msg.content}
                  </span>
                </p>
              ))}
            </div>

            <div className="flex items-center p-4 border-t border-gray-300">
              <input
                type="text"
                value={nuevoMensaje}
                onChange={(e) => setNuevoMensaje(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEnviarMensaje();
                  }
                }}
                placeholder="Escribe un mensaje"
                className="flex-1 border rounded p-2 mr-2"
              />
              <button
                onClick={handleEnviarMensaje}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mensajeria;
