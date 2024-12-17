import AsignarColaborador from "../components/RerservasRoute";

function AsignarColaboradorRoute() {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Asignar Colaborador</h2>
      <AsignarColaborador reservacionId="12345" />
    </div>
  );
}

export default AsignarColaboradorRoute;
