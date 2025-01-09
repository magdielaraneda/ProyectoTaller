import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerReportePorId} from "../services/reporte.service";



const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function DetallesReporte() {
  const { id } = useParams();
  const [reporte, setReporte] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const data = await obtenerReportePorId(id);
        setReporte(data);
      } catch (error) {
        console.error("Error al obtener el reporte:", error);
        setError("No se pudo cargar el reporte. Por favor, intenta nuevamente.");
      }
    };
    fetchReporte();
  }, [id]);


  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!reporte) return <div className="text-center text-gray-500">Cargando reporte...</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Detalles del Reporte</h2>
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
        <p><strong>Tipo de Servicio:</strong> {reporte.tipoServicio}</p>
        <p><strong>Hora de Inicio:</strong> {new Date(reporte.horaInicio).toLocaleString()}</p>
        <p><strong>Hora de Término:</strong> {new Date(reporte.horaTermino).toLocaleString()}</p>
        <p><strong>Observaciones Iniciales:</strong> {reporte.observacionesIniciales || "N/A"}</p>
        <p><strong>Recomendaciones:</strong> {reporte.recomendaciones || "N/A"}</p>
        <p><strong>Observaciones del Cliente:</strong> {reporte.observacionesCliente || "N/A"}</p>

        {reporte.fotosAntes?.length > 0 && (
          <div className="mt-4">
            <strong>Fotos Antes:</strong>
            <div className="grid grid-cols-2 gap-2 mt-2">
            {reporte.fotosAntes?.map((foto, index) => {
  console.log("Ruta de la imagen:", foto);
  return (
    <img
      key={index}
      src={`${BASE_URL}${foto}`}
      alt={`Foto antes ${index + 1}`}
      className="border rounded object-cover w-full h-auto"
    />
  );
})}

            </div>
          </div>
        )}

        {reporte.fotosDespues?.length > 0 && (
          <div className="mt-4">
            <strong>Fotos Después:</strong>
            <div className="grid grid-cols-2 gap-2 mt-2">
            {reporte.fotosDespues?.map((foto, index) => {
  console.log("Ruta de la imagen:", foto);
  return (
    <img
      key={index}
      src={`${BASE_URL}${foto}`}
      alt={`Foto despues ${index + 1}`}
      className="border rounded object-cover w-full h-auto"
    />
  );
})}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default DetallesReporte;
