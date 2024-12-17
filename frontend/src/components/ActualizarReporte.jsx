import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerReportesCompletados, actualizarReporte } from "../services/reporte.service";
import { showSuccessNotification, showErrorNotification } from "../helpers/swaHelper";

function ActualizarReporte() {
  const { id } = useParams();
  const [ setReporte] = useState(null);
  const [tipoServicio, setTipoServicio] = useState("");
  const [observacionesIniciales, setObservacionesIniciales] = useState("");
  const [recomendaciones, setRecomendaciones] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const data = await obtenerReportesCompletados();
        const reporteData = data.find((rep) => rep._id === id);
        if (!reporteData) throw new Error("Reporte no encontrado");
        setReporte(reporteData);
        setTipoServicio(reporteData.tipoServicio || "");
        setObservacionesIniciales(reporteData.observacionesIniciales || "");
        setRecomendaciones(reporteData.recomendaciones || "");
      } catch (error) {
        console.error("Error al cargar el reporte:", error);
      }
    };

    fetchReporte();
  }, [id]);

  const handleActualizar = async () => {
    try {
      await actualizarReporte(id, { tipoServicio, observacionesIniciales, recomendaciones });
      showSuccessNotification("Reporte actualizado con éxito");
      navigate("/");
    } catch (error) {
      console.error("Error al actualizar el reporte:", error);
      showErrorNotification("Error al actualizar el reporte.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Actualizar Reporte</h2>
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tipo de Servicio</label>
          <input
            type="text"
            value={tipoServicio}
            onChange={(e) => setTipoServicio(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Observaciones Iniciales</label>
          <textarea
            value={observacionesIniciales}
            onChange={(e) => setObservacionesIniciales(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Recomendaciones</label>
          <textarea
            value={recomendaciones}
            onChange={(e) => setRecomendaciones(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <button
          onClick={handleActualizar}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Actualizar Reporte
        </button>
      </div>
    </div>
  );
}

export default ActualizarReporte;
