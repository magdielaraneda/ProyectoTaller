import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerServicioPorId, eliminarServicio } from "../services/servicio.service";
import { showSuccessNotification, showErrorNotification } from "../helpers/swaHelper";

function DetallesServicio() {
  const { id } = useParams();
  const [servicio, setServicio] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicio = async () => {
      try {
        const data = await obtenerServicioPorId(id);
        setServicio(data);
      } catch (error) {
        console.error("Error al obtener el servicio:", error);
        setError("Error al obtener el servicio.");
      }
    };

    fetchServicio();
  }, [id]);

  const handleEliminarServicio = async () => {
    try {
      await eliminarServicio(id);
      showSuccessNotification("Servicio eliminado con éxito");
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
      showErrorNotification("Error al eliminar el servicio.");
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!servicio) return <div>Cargando servicio...</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Detalles de Servicio</h2>
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
        <p><strong>Nombre:</strong> {servicio.nombre}</p>
        <p><strong>Categoría:</strong> {servicio.categoria}</p>
        <p><strong>Descripción:</strong> {servicio.description}</p>
        <p><strong>Precio:</strong> ${servicio.precio}</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleEliminarServicio}
        >
          Eliminar Servicio
        </button>
      </div>
    </div>
  );
}

export default DetallesServicio;
