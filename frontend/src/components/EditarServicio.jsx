import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerServicioPorId, actualizarServicio } from "../services/servicio.service";
import { showSuccessNotification, showErrorNotification } from "../helpers/swaHelper";

function EditarServicio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [subServicios, setSubServicios] = useState([]);
  const [subServicioInput, setSubServicioInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicio = async () => {
      try {
        const servicio = await obtenerServicioPorId(id);
        setNombre(servicio.nombre || "");
        setCategoria(servicio.categoria || "");
        setDescripcion(servicio.description || "");
        setPrecio(servicio.precio || "");
        setSubServicios(Array.isArray(servicio.subServicios) ? servicio.subServicios : []);
      } catch (error) {
        console.error("Error al cargar el servicio:", error);
        showErrorNotification("Error al cargar los datos del servicio.");
      } finally {
        setLoading(false);
      }
    };

    fetchServicio();
  }, [id]);

  const agregarSubServicio = () => {
    if (subServicioInput.trim()) {
      setSubServicios([...subServicios, subServicioInput.trim()]);
      setSubServicioInput("");
    }
  };

  const eliminarSubServicio = (index) => {
    setSubServicios(subServicios.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarServicio(id, {
        nombre,
        categoria,
        description: descripcion,
        precio,
        subServicios,
      });
      showSuccessNotification("Servicio actualizado con éxito.");
      navigate("/ServiciosPorCategoria"); 
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
      showErrorNotification("Error al actualizar el servicio.");
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando servicio...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Editar Servicio</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Categoría */}
        <div className="mb-4">
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Seleccionar Categoría</option>
            <option value="limpieza">Limpieza</option>
            <option value="estética">Estética</option>
            <option value="prevención">Prevención</option>
          </select>
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        {/* Precio */}
        <div className="mb-4">
          <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Sub-Servicios */}
        <div className="mb-4">
          <label htmlFor="subServicios" className="block text-sm font-medium text-gray-700">
            Sub-Servicios
          </label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              id="subServicios"
              value={subServicioInput}
              onChange={(e) => setSubServicioInput(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ingrese un sub-servicio"
            />
            <button
              type="button"
              onClick={agregarSubServicio}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Agregar
            </button>
          </div>
          <ul>
            {subServicios.map((subServicio, index) => (
              <li key={index} className="flex items-center justify-between mb-1">
                {typeof subServicio === "string" ? subServicio : "Sub-servicio no válido"}
                <button
                  type="button"
                  onClick={() => eliminarSubServicio(index)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Botón para actualizar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Actualizar Servicio
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarServicio;
