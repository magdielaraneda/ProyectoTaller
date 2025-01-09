/*import { useState, useEffect } from "react";
import { getServicios, getColaboradoresPorServicio, getHorarioColaborador } from "../services/reserva.service";

function ReservaForm() {
  const [servicios, setServicios] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [horario, setHorario] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState(null);

  useEffect(() => {
    const fetchServicios = async () => {
      const data = await getServicios();
      setServicios(data);
    };
    fetchServicios();
  }, []);

  const handleServicioSeleccionado = async (servicioId) => {
    setServicioSeleccionado(servicioId);
    const data = await getColaboradoresPorServicio(servicioId);
    setColaboradores(data);
  };

  const handleColaboradorSeleccionado = async (colaboradorId) => {
    setColaboradorSeleccionado(colaboradorId);

    const semanaInicio = new Date(); // Fecha de inicio de la semana
    const data = await getHorarioColaborador(colaboradorId, semanaInicio);
    setHorario(data);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Reservar Servicio</h2>

      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Seleccionar Servicio</label>
        <select
          className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          onChange={(e) => handleServicioSeleccionado(e.target.value)}
        >
          <option value="">Seleccionar Servicio</option>
          {servicios.map((servicio) => (
            <option key={servicio._id} value={servicio._id}>
              {servicio.nombre}
            </option>
          ))}
        </select>
      </div>

      
      {colaboradores.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Seleccionar Colaborador</label>
          <select
            className="block w-full px-4 py-2 border border-gray-300 rounded-md"
            onChange={(e) => handleColaboradorSeleccionado(e.target.value)}
          >
            <option value="">Seleccionar Colaborador</option>
            {colaboradores.map((colaborador) => (
              <option key={colaborador._id} value={colaborador._id}>
                {colaborador.username}
              </option>
            ))}
          </select>
        </div>
      )}

     
      {horario.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-2">Horario Semanal</h3>
          {horario.map((dia) => (
            <div key={dia.dia} className="mb-4">
              <h4 className="font-semibold">{new Date(dia.dia).toLocaleDateString()}</h4>
              {dia.horariosDia.map((bloque, index) => (
                <div
                  key={index}
                  className={`py-1 ${bloque.ocupado ? "text-red-500" : "text-green-500"}`}
                >
                  {`${bloque.inicioHora.toLocaleTimeString()} - ${bloque.finHora.toLocaleTimeString()}`}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReservaForm;
*/