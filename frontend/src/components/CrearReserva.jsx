import { useState, useEffect } from "react";
import {
  crearReservacion,
  getHorarioColaborador,
  getColaboradorPorId,
} from "../services/reserva.service";
import { showSuccessNotification, showErrorNotification } from "../helpers/swaHelper";
import { useParams } from "react-router-dom";
import { obtenerServicioPorId } from "../services/servicio.service";

function CrearReserva() {
  const { servicioId, colaboradorId } = useParams();
  const [horario, setHorario] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [clienteNombre, setClienteNombre] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [clienteTelefono, setClienteTelefono] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [semanaInicio, setSemanaInicio] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [servicioNombre, setServicioNombre] = useState("");
  const [colaboradorNombre, setColaboradorNombre] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchHorario = async () => {
    try {
      const data = await getHorarioColaborador(colaboradorId, semanaInicio);

      if (!Array.isArray(data)) {
        console.error("Error: los datos de horarios no son un array:", data);
        return;
      }

      const fechaActual = new Date();
      fechaActual.setHours(0, 0, 0, 0);

      const horariosValidados = data
        .filter((dia) => {
          const diaFecha = new Date(dia.dia);
          diaFecha.setHours(0, 0, 0, 0);
          return diaFecha.getTime() > fechaActual.getTime();
        })
        .map((dia) => ({
          ...dia,
          horariosDia: dia.horariosDia?.map((bloque) => ({
            ...bloque,
            ocupado: !!bloque.ocupado,
          })),
        }));

      setHorario(horariosValidados);
    } catch (error) {
      console.error("Error al obtener horarios:", error);
    }
  };

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const servicio = await obtenerServicioPorId(servicioId);
        const colaborador = await getColaboradorPorId(colaboradorId);

        setServicioNombre(servicio.nombre || "Servicio no encontrado");
        setColaboradorNombre(colaborador.username || "Colaborador no encontrado");
      } catch (error) {
        console.error("Error al obtener los datos del servicio o colaborador:", error);
      }
    };

    fetchDatos();
    fetchHorario();
  }, [servicioId, colaboradorId, semanaInicio]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!horarioSeleccionado) {
        showErrorNotification("Por favor, selecciona un horario válido.");
        setIsLoading(false);
        return;
      }

      if (!clienteTelefono) {
        showErrorNotification("El número de teléfono del cliente es obligatorio.");
        setIsLoading(false);
        return;
      }

      const reservaData = {
        colaboradorId,
        servicioId,
        horario: horarioSeleccionado,
        clienteNombre,
        clienteEmail,
        clienteTelefono,
        direccionCliente,
        observaciones,
      };

      await crearReservacion(reservaData);
      showSuccessNotification("Reserva creada con éxito");
      setModalVisible(false);
      fetchHorario();
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      showErrorNotification(error.message || "Error desconocido al crear la reserva.");
    } finally {
      setIsLoading(false);
    }
  };

  const avanzarSemana = () => {
    const nuevaSemana = new Date(semanaInicio);
    nuevaSemana.setDate(semanaInicio.getDate() + 7);
    setSemanaInicio(nuevaSemana);
  };

  const retrocederSemana = () => {
    const nuevaSemana = new Date(semanaInicio);
    nuevaSemana.setDate(semanaInicio.getDate() - 7);
    setSemanaInicio(nuevaSemana);
  };

  const fechaActual = new Date();
  fechaActual.setHours(0, 0, 0, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-2">{servicioNombre}</h2>
      <h3 className="text-md text-center text-gray-600 mb-4">{colaboradorNombre}</h3>
      <div className="flex justify-between mb-4">
        {semanaInicio > fechaActual && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={retrocederSemana}
          >
            Semana anterior
          </button>
        )}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={avanzarSemana}
        >
          Semana siguiente
        </button>
      </div>

      {horario.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full text-center">
            <thead>
              <tr>
                <th className="border border-gray-200 px-2 py-1">Hora</th>
                {horario.map((dia, index) => (
                  <th key={index} className="border border-gray-200 px-2 py-1">
                    {new Date(dia.dia).toLocaleDateString()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 9 }, (_, i) => i + 8).map((hora) => (
                <tr key={hora}>
                  <td className="border border-gray-200 px-2 py-1">
                    {`${hora}:00 - ${hora + 1}:00`}
                  </td>
                  {horario.map((dia) => {
                    const bloque = dia.horariosDia?.find(
                      (h) => new Date(h.inicioHora).getHours() === hora
                    );
                    return (
                      <td
                        key={`${dia.dia}-${hora}`}
                        className={`border border-gray-200 px-2 py-1 ${
                          bloque?.ocupado ? "bg-red-500" : "bg-blue-500"
                        }`}
                      >
                        <button
                          className={`${
                            bloque?.ocupado
                              ? "bg-red-500"
                              : "bg-blue-500 text-white"
                          } font-semibold w-full h-full rounded text-sm`}
                          onClick={() => {
                            if (bloque?.inicioHora) {
                              const fechaSeleccionada = new Date(bloque.inicioHora);
                              setHorarioSeleccionado(fechaSeleccionada.toISOString());
                            }
                            setModalVisible(true);
                          }}
                          disabled={bloque?.ocupado}
                        >
                          {bloque?.ocupado ? "Ocupado" : "Disponible"}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Información del Cliente</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={clienteNombre}
                onChange={(e) => setClienteNombre(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Correo"
                value={clienteEmail}
                onChange={(e) => setClienteEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={clienteTelefono}
                onChange={(e) => setClienteTelefono(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Dirección"
                value={direccionCliente}
                onChange={(e) => setDireccionCliente(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Observaciones"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-red-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  onClick={() => setModalVisible(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Procesando..." : "Crear Reserva"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrearReserva;
