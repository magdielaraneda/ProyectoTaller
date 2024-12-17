import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { crearReservacion } from "../services/reserva.service";
import { getServicios } from "../services/servicio.service";
import { showSuccessNotification, showErrorNotification } from "../helpers/swaHelper";
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaStickyNote, FaClock } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CrearReserva() {
  const { id } = useParams();
  const [servicio, setServicio] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState("");
  const [clienteNombre, setClienteNombre] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [clienteTelefono, setClienteTelefono] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    const fetchServicio = async () => {
      try {
        const data = await getServicios();
        const servicioSeleccionado = data.find((servicio) => servicio._id === id);
        if (servicioSeleccionado) {
          setServicio(servicioSeleccionado);
        } else {
          console.error("Servicio no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    };

    fetchServicio();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!fecha || !hora) {
        showErrorNotification("Por favor selecciona una fecha y una hora válida.");
        return;
      }

      const horario = new Date(fecha);
      const [horaSeleccionada, minutosSeleccionados] = hora.split(":");
      horario.setHours(horaSeleccionada, minutosSeleccionados);

      const reservaData = {
        servicioId: id,
        horario,
        clienteNombre,
        clienteEmail,
        clienteTelefono,
        direccionCliente,
        observaciones,
      };

      await crearReservacion(reservaData);

      setFecha(null);
      setHora("");
      setClienteNombre("");
      setClienteEmail("");
      setClienteTelefono("");
      setDireccionCliente("");
      setObservaciones("");

      showSuccessNotification("Reserva creada con éxito");
    } catch (error) {
      console.error("Error al crear la reservación:", error);
      showErrorNotification("Error al crear la reserva. Por favor intente nuevamente.");
    }
  };

  const horasDisponibles = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
  ];

  return (
    <div className="h-screen w-screen flex">
      {/* Formulario en la izquierda */}
      <div className="w-1/2 h-full bg-gray-100 p-8 flex flex-col justify-center">
        <header className="text-center mb-6">
          <h1 className="text-5xl font-bold text-blue-700">Crear Reservación</h1>
          <p className="text-blue-500 mt-2">
            Completa el formulario con tus datos para realizar tu reserva.
          </p>
        </header>

        {/* Mostrar el servicio seleccionado */}
        {servicio ? (
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-700">
              Servicio Seleccionado:
              <span className="text-blue-500 block mt-2">{servicio.nombre}</span>
            </h3>
          </div>
        ) : (
          <p className="text-center text-gray-500">Cargando servicio...</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Fecha */}
          <div>
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">
              <FaCalendarAlt className="inline mr-2 text-blue-500" />
              Fecha
            </label>
            <DatePicker
              selected={fecha}
              onChange={(date) => setFecha(date)}
              className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecciona una fecha"
            />
          </div>

          {/* Hora */}
          <div>
            <label htmlFor="hora" className="block text-sm font-medium text-gray-700 mb-1">
              <FaClock className="inline mr-2 text-blue-500" />
              Hora
            </label>
            <select
              id="hora"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecciona una hora</option>
              {horasDisponibles.map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          </div>

          {/* Nombre */}
          <div>
            <label htmlFor="clienteNombre" className="block text-sm font-medium text-gray-700 mb-1">
              <FaUser className="inline mr-2 text-blue-500" />
              Nombre del Cliente
            </label>
            <input
              type="text"
              id="clienteNombre"
              value={clienteNombre}
              onChange={(e) => setClienteNombre(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="clienteEmail" className="block text-sm font-medium text-gray-700 mb-1">
              <FaEnvelope className="inline mr-2 text-blue-500" />
              Correo Electrónico
            </label>
            <input
              type="email"
              id="clienteEmail"
              value={clienteEmail}
              onChange={(e) => setClienteEmail(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="clienteTelefono" className="block text-sm font-medium text-gray-700 mb-1">
              <FaPhone className="inline mr-2 text-blue-500" />
              Teléfono
            </label>
            <input
              type="tel"
              id="clienteTelefono"
              value={clienteTelefono}
              onChange={(e) => setClienteTelefono(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Dirección */}
          <div>
            <label htmlFor="direccionCliente" className="block text-sm font-medium text-gray-700 mb-1">
              <FaMapMarkerAlt className="inline mr-2 text-blue-500" />
              Dirección
            </label>
            <input
              type="text"
              id="direccionCliente"
              value={direccionCliente}
              onChange={(e) => setDireccionCliente(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Observaciones */}
          <div className="col-span-2">
            <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">
              <FaStickyNote className="inline mr-2 text-blue-500" />
              Observaciones
            </label>
            <textarea
              id="observaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* Botón */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 shadow-md transition-all"
            >
              Crear Reservación
            </button>
          </div>
        </form>
      </div>

      {/* Contenedor de imagen */}
      <div
        className="w-1/2 h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/4.jpg')" }}
      ></div>
    </div>
  );
}

export default CrearReserva;
