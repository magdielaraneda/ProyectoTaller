import { useNotifications } from "../context/NotificationContext";

function Notificaciones() {
  const { notificaciones, marcarComoLeida } = useNotifications();

  return (
    <div className="fixed bottom-4 left-4 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
      <h3 className="text-lg font-bold mb-2">Noficaciones</h3>
      {notificaciones.length > 0 ? (
        <ul className="space-y-2">
          {notificaciones.map((notificacion, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded-lg">
              <div className="flex justify-between items-center">
                <span>{notificacion}</span>
                <button
                  onClick={() => marcarComoLeida(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay nuevas</p>
      )}
    </div>
  );
}

export default Notificaciones;
