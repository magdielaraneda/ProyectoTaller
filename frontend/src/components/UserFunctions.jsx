import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersService, deleteUserService } from "../services/user.service";
import { showSuccessNotification, showErrorNotification } from "../helpers/swaHelper";

function UserFunctions() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsersService();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener los usuarios:", err);
        setError("Error al obtener los usuarios.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEliminarUsuario = async (userId) => {
    try {
      await deleteUserService(userId);
      setUsers(users.filter((user) => user._id !== userId)); 
      showSuccessNotification("Usuario eliminado con éxito");
    } catch (err) {
      console.error("Error al eliminar el usuario:", err.message);
      showErrorNotification(err.message || "Error al eliminar el usuario.");
    }
  };
  
  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white border border-gray-300 rounded-lg shadow-lg p-4"
          >
            <p>
              <strong>Nombre:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>RUT:</strong> {user.rut}
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleEliminarUsuario(user._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserFunctions;
