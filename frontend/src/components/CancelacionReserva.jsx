import { useSearchParams } from "react-router-dom";

function CancelacionReserva() {
  const [searchParams] = useSearchParams();
  const estado = searchParams.get("estado");

  let mensaje;
  if (estado === "exito") {
    mensaje = "Tu reserva ha sido cancelada con éxito.";
  } else if (estado === "no-encontrada") {
    mensaje = "La reserva no fue encontrada o ya fue cancelada.";
  } else {
    mensaje = "Ocurrió un error al cancelar tu reserva. Por favor, inténtalo nuevamente.";
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Cancelación de Reserva</h1>
        <p className="text-gray-700">{mensaje}</p>
        <a
          href="/"
          className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  );
}

export default CancelacionReserva;
