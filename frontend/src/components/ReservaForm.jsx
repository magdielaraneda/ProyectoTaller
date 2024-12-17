import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import axios from "../services/root.service";

function ReservaForm({ servicioId }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/reservas", { ...data, servicioId });
      alert("Reserva creada exitosamente.");
      reset();
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      alert("Ocurrió un error. Intente de nuevo.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded shadow-md"
    >
      <div>
        <label htmlFor="clienteNombre" className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          id="clienteNombre"
          {...register("clienteNombre", { required: true })}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="clienteEmail" className="block text-sm font-medium text-gray-700">
          Correo Electrónico
        </label>
        <input
          id="clienteEmail"
          type="email"
          {...register("clienteEmail", { required: true })}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="horario" className="block text-sm font-medium text-gray-700">
          Fecha y Hora
        </label>
        <input
          id="horario"
          type="datetime-local"
          {...register("horario", { required: true })}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Crear Reserva
      </button>
    </form>
  );
}

ReservaForm.propTypes = {
  servicioId: PropTypes.string.isRequired,
};

export default ReservaForm;
