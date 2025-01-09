import CrearReserva from "../components/CrearReserva";

function CrearReservaRoute() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-blue-900">Selecciona el Horario de tu Reserva</h1>
        </div>
      </header>
      <div className="container mx-auto mt-0">
        <CrearReserva />
      </div>
    </>
  );
}

export default CrearReservaRoute;
