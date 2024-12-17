import { useState } from "react";
import { getServicios } from "../services/servicio.service";
import { useNavigate } from "react-router-dom";

function ServiciosPorCategoria() {
  const [categoria, setCategoria] = useState("");
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleBuscar = async () => {
    try {
      const data = await getServicios(categoria);
      setServicios(data);
      setError(null);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
      setError("Error al obtener servicios.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Servicios por Categoría</h2>
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-md mb-4"
      >
        <option value="">Seleccionar Categoría</option>
        <option value="limpieza">Limpieza</option>
        <option value="estética">Estética</option>
        <option value="prevención de riesgos">Prevención</option>
      </select>
      <button
        onClick={handleBuscar}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="mt-4">
        {servicios.map((servicio) => (
          <div key={servicio._id} className="border p-4 rounded mb-2">
            <p>
              <strong>Nombre:</strong> {servicio.nombre}
            </p>
            <p>
              <strong>Descripción:</strong> {servicio.description}
            </p>
            <p>
              <strong>Precio:</strong> ${servicio.precio}
            </p>
            <button
  onClick={() => navigate(`/editar-servicio/${servicio._id}`)}
  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
>
  Editar
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiciosPorCategoria;
