import { useState, useEffect } from "react";
import { createUserService } from "../services/user.service";
import { showSuccessNotification, showErrorNotification } from "../helpers/swaHelper";

function CrearUsuario() {
  const [username, setUsername] = useState("");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [availableRoles, setAvailableRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = ["gerente", "colaborador", "cliente"]; 
        const filteredRoles = rolesData.filter((rol) => rol !== "admin"); 
        setAvailableRoles(rolesData, filteredRoles);
      } catch (error) {
        console.error("Error al cargar los roles:", error.message);
      }
    };

    fetchRoles();
  }, []);

  const agregarRol = () => {
    if (selectedRole && !roles.includes(selectedRole)) {
      setRoles([...roles, selectedRole]);
      setSelectedRole("");
    }
  };

  const eliminarRol = (index) => {
    const nuevosRoles = roles.filter((_, i) => i !== index);
    setRoles(nuevosRoles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { username, rut, email, password, roles };
      await createUserService(userData);

      setUsername("");
      setRut("");
      setEmail("");
      setPassword("");
      setRoles([]);
      showSuccessNotification("Usuario creado con éxito");
    } catch (error) {
      console.error("Error al crear el usuario:", error.message);
      showErrorNotification("Error al crear el usuario. Por favor, inténtelo nuevamente.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Crear Usuario</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rut" className="block text-sm font-medium text-gray-700">
            RUT
          </label>
          <input
            type="text"
            id="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Selección de roles */}
        <div className="mb-4">
          <label htmlFor="roles" className="block text-sm font-medium text-gray-700">
            Roles
          </label>
          <div className="flex items-center gap-2 mb-2">
            <select
              id="roles"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Selecciona un rol</option>
              {availableRoles.map((rol) => (
                <option key={rol} value={rol}>
                  {rol}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={agregarRol}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Agregar
            </button>
          </div>
          <ul>
            {roles.map((rol, index) => (
              <li key={index} className="flex items-center justify-between mb-1">
                {rol}
                <button
                  type="button"
                  onClick={() => eliminarRol(index)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Crear Usuario
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearUsuario;
