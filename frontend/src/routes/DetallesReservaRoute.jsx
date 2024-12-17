import DetallesReserva from '../components/DetallesReserva';

function DetallesReservaRoute() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Detalles de Reserva</h1>
        </div>
      </header>
      <div className="container mx-auto mt-8">
        <DetallesReserva />
      </div>
    </>
  );
}

export default DetallesReservaRoute;
