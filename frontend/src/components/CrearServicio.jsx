import { useState } from "react";
import { crearServicio } from "../services/servicio.service";
import { showSuccessNotification, showErrorNotification } from "../helpers/swaHelper";

function CrearServicio() {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [subServicios, setSubServicios] = useState([]);

  const [subServicioInput, setSubServicioInput] = useState("");

  const agregarSubServicio = () => {
    if (subServicioInput) {
      setSubServicios([...subServicios, subServicioInput]);
      setSubServicioInput("");
    }
  };

  const eliminarSubServicio = (index) => {
    const nuevosSubServicios = subServicios.filter((_, i) => i !== index);
    setSubServicios(nuevosSubServicios);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const servicioData = { nombre, categoria, description: descripcion, precio, subServicios };
      await crearServicio(servicioData);

      setNombre("");
      setCategoria("");
      setDescripcion("");
      setPrecio("");
      setSubServicios([]);
      showSuccessNotification("Servicio creado con éxito");
    } catch (error) {
      console.error("Error al crear el servicio:", error.message);
      showErrorNotification("Error al crear el servicio. Por favor, inténtelo nuevamente.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Crear Servicio</h2>

        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Seleccionar Categoría</option>
            <option value="limpieza">Limpieza</option>
            <option value="estética">Estética</option>
            <option value="prevención de riesgos">Prevención</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        {/* Campo de precio interactivo */}
        <div className="mb-4">
          <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <div className="flex items-center border border-gray-300 rounded-md">
            <span className="px-3 text-gray-500 bg-gray-100 border-r border-gray-300">$</span>
            <input
              type="number"
              id="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="block w-full p-2 rounded-r-md"
              placeholder="Ingrese el precio"
              required
            />
          </div>
        </div>

        {/* Campo de subservicios */}
        <div className="mb-4">
          <label htmlFor="subServicios" className="block text-sm font-medium text-gray-700">
            Sub-Servicios
          </label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              id="subServicios"
              value={subServicioInput}
              onChange={(e) => setSubServicioInput(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ingrese un subservicio"
            />
            <button
              type="button"
              onClick={agregarSubServicio}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Agregar
            </button>
          </div>
          <ul>
            {subServicios.map((subServicio, index) => (
              <li key={index} className="flex items-center justify-between mb-1">
                {subServicio}
                <button
                  type="button"
                  onClick={() => eliminarSubServicio(index)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Crear Servicio
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearServicio;
