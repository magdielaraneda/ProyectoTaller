import { useState, useEffect } from "react";
import { getServicios } from "../services/servicio.service";
import { useNavigate } from "react-router-dom";

function PublicServices() {
  const navigate = useNavigate();

  const [servicios, setServicios] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);

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

  const categorias = {
    "prevención de riesgos": {
      servicios: servicios.filter(
        (servicio) => servicio.categoria === "prevención de riesgos"
      ),
      bgImage: "url('/images/P.jpg')",
    },
    estética: {
      servicios: servicios.filter(
        (servicio) => servicio.categoria === "estética"
      ),
      bgImage: "url('/images/E.jpg')",
    },
    limpieza: {
      servicios: servicios.filter(
        (servicio) => servicio.categoria === "limpieza"
      ),
      bgImage: "url('/images/L.jpg')",
    },
  };

  const toggleDescription = (id) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Encabezado */}
      <header className="bg-blue-700 text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Servicios Disponibles</h1>
          <p className="mt-1 text-blue-200 text-sm">
            Selecciona un servicio para conocer más detalles.
          </p>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-80px)]">
        {Object.entries(categorias).map(([categoria, { servicios, bgImage }]) => (
          <div
            key={categoria}
            className="relative flex flex-col justify-start items-center p-6"
            style={{
              backgroundImage: `${bgImage}`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.8)",
              overflowY: "auto",
            }}
          >
            {/* Contenedor de título */}
            <div className="bg-white bg-opacity-80 px-4 py-2 rounded-md shadow-md mb-4">
              <h2 className="text-gray-800 text-lg font-bold text-center">
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </h2>
            </div>
            <ul className="w-full space-y-2">
              {servicios.map((servicio) => (
                <li
                  key={servicio._id}
                  className="bg-white bg-opacity-90 shadow-md rounded-md p-2 flex justify-between items-center"
                >
                  <span className="text-sm text-gray-800 font-medium">
                    {servicio.nombre} - ${servicio.precio}
                  </span>
                  <button
                    onClick={() => toggleDescription(servicio._id)}
                    className="px-3 py-1 text-xs font-medium text-gray-800 bg-gray-200 border border-gray-300 rounded-full hover:bg-gray-300 transition"
                  >
                    Detalle
                  </button>
                </li>
              ))}
            </ul>

            {/* Tarjeta expandida */}
            {servicios.map((servicio) =>
              expandedCard === servicio._id ? (
                <div
                  key={`detail-${servicio._id}`}
                  className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-95 p-6 rounded-md shadow-lg flex flex-col items-center justify-center space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {servicio.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {servicio.description}
                  </p>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => navigate(`/CrearReservaRoute/${servicio._id}`)}
                  >
                    Reservar Aquí
                  </button>
                  <button
                    onClick={() => toggleDescription(null)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Cerrar
                  </button>
                </div>
              ) : null
            )}
          </div>
        ))}
      </main>
    </div>
  );
}

export default PublicServices;
