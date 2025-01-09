import { useState, useEffect } from "react";
import { obtenerColaboradoresDisponibles } from "../services/reserva.service";
import { useNavigate } from "react-router-dom";
import { getServicios } from "../services/servicio.service";

function PublicServices() {
  const navigate = useNavigate();

  const [servicios, setServicios] = useState([]); // Lista de servicios
  const [colaboradores, setColaboradores] = useState([]); // Lista de colaboradores filtrados
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); // Categoría seleccionada
  const [expandedCard, setExpandedCard] = useState(null); // Servicio expandido

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const data = await getServicios();
        setServicios(data);
      } catch (error) {
        console.error("Error al obtener servicios:", error);
      }
    };

    fetchServicios();
  }, []);

  const handleVerColaboradores = async (servicioId) => {
    try {
      const data = await obtenerColaboradoresDisponibles(); // Obtiene todos los colaboradores disponibles
      setColaboradores(data);
      setExpandedCard(servicioId); // Expande el servicio para mostrar colaboradores
    } catch (error) {
      console.error("Error al obtener colaboradores:", error);
    }
  };

  const handleSeleccionarColaborador = (servicioId, colaboradorId) => {
    navigate(`/CrearReservaRoute/${servicioId}/${colaboradorId}`);
  };

  const categorias = Array.from(new Set(servicios.map((servicio) => servicio.categoria)));
  const serviciosFiltrados = categoriaSeleccionada
    ? servicios.filter((servicio) => servicio.categoria === categoriaSeleccionada)
    : [];

  return (
    <div className="bg-white min-h-screen w-full">
      <header className="bg-white-700 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Servicios por Categoría</h1>
          <p className="mt-1 text-blue-800 text-sm">
            Haz clic en una categoría para ver los servicios disponibles.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Lista de Categorías */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={`p-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 ${
                categoriaSeleccionada === categoria ? "bg-blue-700" : ""
              }`}
              onClick={() => setCategoriaSeleccionada(categoria)}
            >
              {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
            </button>
          ))}
        </div>

        {/* Servicios Filtrados */}
        {categoriaSeleccionada && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-700">
              Servicios en la categoría: {categoriaSeleccionada}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {serviciosFiltrados.map((servicio) => (
                <div
                  key={servicio._id}
                  className="p-4 bg-white shadow-md rounded-md border"
                >
                  <h3 className="text-lg font-bold">{servicio.nombre}</h3>
                  <p className="text-gray-500">{servicio.description}</p>
                  <p className="mt-2 text-gray-700 font-semibold">${servicio.precio}</p>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
                    onClick={() => handleVerColaboradores(servicio._id)}
                  >
                    Selecciona un Colaborador
                  </button>

                  {/* Mostrar colaboradores disponibles para el servicio */}
                  {expandedCard === servicio._id && (
                    <ul className="mt-4 space-y-2">
                      {colaboradores.map((colaborador) => (
                        <li
                          key={colaborador._id}
                          className="flex justify-between items-center p-2 bg-gray-100 rounded-md shadow"
                        >
                          <span>{colaborador.username}</span>
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                            onClick={() =>
                              handleSeleccionarColaborador(servicio._id, colaborador._id)
                            }
                          >
                            Seleccionar
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default PublicServices;
