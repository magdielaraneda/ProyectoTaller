import { useState } from "react";
import { buscarEncuestasPorColaborador } from "../services/encuesta.service";

function BuscarEncuestasPorColaborador() {
  const [username, setUsername] = useState("");
  const [encuestas, setEncuestas] = useState([]);
  const [error, setError] = useState(null);

  const handleBuscar = async () => {
    try {
      const data = await buscarEncuestasPorColaborador(username);
      setEncuestas(data);
      setError(null);
    } catch (error) {
      console.error("Error al buscar encuestas:", error);
      setError("No se encontraron encuestas para el colaborador.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Buscar Encuestas por Colaborador</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nombre del colaborador"
        className="block w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <button
        onClick={handleBuscar}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="mt-4">
        {encuestas.map((encuesta) => (
          <div key={encuesta._id} className="border p-4 rounded mb-2">
            <p><strong>Clasificación:</strong> {encuesta.clasificacion}</p>
            <p><strong>Comentario:</strong> {encuesta.comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuscarEncuestasPorColaborador;
