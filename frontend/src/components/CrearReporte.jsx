import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { crearReporte } from "../services/reporte.service";
import { obtenerReservacionPorId } from "../services/reserva.service";
import { showSuccessNotification, showErrorNotification } from "../helpers/swaHelper";

function CrearReporte() {
  const { reservacionId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const [nombreServicio, setNombreServicio] = useState("Cargando servicio...");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaTermino, setHoraTermino] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");
  const [observacionesIniciales, setObservacionesIniciales] = useState("");
  const [recomendaciones, setRecomendaciones] = useState("");
  const [observacionesCliente, setObservacionesCliente] = useState("");
  const [firmaCliente, setFirmaCliente] = useState("");
  const [fotosAntes, setFotosAntes] = useState([]);
  const [fotosDespues, setFotosDespues] = useState([]);

  useEffect(() => {
    const fetchReservacion = async () => {
      try {
        const reservacion = await obtenerReservacionPorId(reservacionId);
        setNombreServicio(reservacion.servicioId?.nombre || "Servicio no especificado");
        setTipoServicio(reservacion.servicioId?.nombre || "");
      } catch (error) {
        console.error("Error al obtener la reservación:", error);
        setNombreServicio("Error al cargar servicio");
      }
    };

    if (reservacionId) fetchReservacion();
  }, [reservacionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Activar el estado de carga

    const currentDate = new Date().toISOString().split("T")[0];
    const horaInicioCompleta = new Date(`${currentDate}T${horaInicio}`);
    const horaTerminoCompleta = new Date(`${currentDate}T${horaTermino}`);

    const formData = new FormData();
    formData.append("reservacionId", reservacionId);
    formData.append("horaInicio", horaInicioCompleta.toISOString());
    formData.append("horaTermino", horaTerminoCompleta.toISOString());
    formData.append("tipoServicio", tipoServicio);
    formData.append("observacionesIniciales", observacionesIniciales);
    formData.append("recomendaciones", recomendaciones);
    formData.append("observacionesCliente", observacionesCliente);
    formData.append("firmaCliente", firmaCliente);

    fotosAntes.forEach((file) => formData.append("fotosAntes", file));
    fotosDespues.forEach((file) => formData.append("fotosDespues", file));

    console.log("Datos enviados al backend:");
    formData.forEach((value, key) => console.log(`${key}:`, value));

    try {
      await crearReporte(formData);
      showSuccessNotification("Reporte creado con éxito");
      navigate("/home-colaborador"); // Redirigir al home del colaborador
    } catch (error) {
      console.error("Error al crear el reporte:", error);
      showErrorNotification(error.message);
    } finally {
      setIsLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-800 py-10 shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Crear Reporte</h1>
          <p className="text-gray-300 mt-2">
            Completa los detalles del reporte para la reservación #{reservacionId} - {" "}
            <span className="font-semibold">{nombreServicio}</span>.
          </p>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div>
            <label className="block font-medium text-gray-700">Hora Inicio</label>
            <input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Hora Término</label>
            <input
              type="time"
              value={horaTermino}
              onChange={(e) => setHoraTermino(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Tipo de Servicio</label>
            <input
              type="text"
              value={tipoServicio}
              readOnly
              className="w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="col-span-2">
            <label className="block font-medium text-gray-700">Observaciones Iniciales</label>
            <textarea
              value={observacionesIniciales}
              onChange={(e) => setObservacionesIniciales(e.target.value)}
              placeholder="Describe las observaciones iniciales"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="col-span-2">
            <label className="block font-medium text-gray-700">Recomendaciones</label>
            <textarea
              value={recomendaciones}
              onChange={(e) => setRecomendaciones(e.target.value)}
              placeholder="Escribe las recomendaciones"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="col-span-2">
            <label className="block font-medium text-gray-700">Observaciones del Cliente</label>
            <textarea
              value={observacionesCliente}
              onChange={(e) => setObservacionesCliente(e.target.value)}
              placeholder="Añade las observaciones del cliente"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block font-medium text-gray-700">Firma del Cliente (URL)</label>
            <input
              type="text"
              value={firmaCliente}
              onChange={(e) => setFirmaCliente(e.target.value)}
              placeholder="Firma del cliente (opcional)"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Fotos Antes</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFotosAntes(Array.from(e.target.files))}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Fotos Después</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFotosDespues(Array.from(e.target.files))}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-1 md:col-span-3">
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md transition-colors duration-200 text-white ${
                isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Procesando..." : "Crear Reporte"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CrearReporte;
