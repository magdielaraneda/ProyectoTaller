import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/App.jsx";
import Root from "./routes/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Login from "./routes/Login.jsx";
import CrearReservaRoute from "./routes/CrearReservaRoute.jsx";
import DetallesReservaRoute from "./routes/DetallesReservaRoute.jsx";
import ReservasAgrupadasRoute from "./routes/ReservasAgrupadasRoute.jsx";
import ServiciosPorCategoriaRoute from "./routes/ServiciosPorCategoriaRoute.jsx";
import BuscarEncuestasPorColaboradorRoute from "./routes/BuscarEncuestasPorColaboradorRoute.jsx";
import ActualizarReporteRoute from "./routes/ActualizarReporteRoute.jsx";
import DetallesEncuestaRoute from "./routes/DetallesEncuestaRoute.jsx";
import DetallesReporteRoute from "./routes/DetallesReporteRoute.jsx";
import DetallesServicioRoute from "./routes/DetallesServicioRoute.jsx";
import CrearReporteRoute from "./routes/CrearReporteRoute.jsx";
import CrearServicioRoute from "./routes/CrearServicioRoute.jsx";
import EnviarEncuestaRoute from "./routes/EnviarEncuestaRoute.jsx";
import VerServiciosRoute from "./routes/VerServiciosRoute.jsx";
import HomePageColaboradorRoute from "./routes/HomePageColaboradorRoute.jsx";
import AsignarColaboradorRoute from "./routes/AsignarColaboradorRoute.jsx";
import ReservacionesRoute from "./routes/ReservacionesRoute.jsx";
import EditarServicioRoute from "./routes/EditarServicioRoute.jsx";
import CrearUsuarioRoute from "./routes/CrearUsuarioRoute.jsx";
import UserFunctionsRoute from "./routes/UserFunctionsRoute.jsx";
import "./index.css";







const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <App /> },
      { path: "/DetallesReservasRoute/:id", element: <DetallesReservaRoute /> },
      { path: "/reservasAgrupadas", element: <ReservasAgrupadasRoute /> },
      { path: "/ServiciosPorCategoria", element: <ServiciosPorCategoriaRoute /> },
      { path: "/home-colaborador", element: <HomePageColaboradorRoute /> },
      { path: "/BuscarEncuestasPorColaboradorRoute", element: <BuscarEncuestasPorColaboradorRoute /> },
      { path: "/actualizarReporte/:id", element: <ActualizarReporteRoute /> },
      { path: "/detallesEncuesta/:id", element: <DetallesEncuestaRoute /> },
      { path: "/detallesReporte/:id", element: <DetallesReporteRoute /> },
      { path: "/detallesServicio/:id", element: <DetallesServicioRoute /> },
      { path: "/CrearReporteRoute/:reservacionId", element: <CrearReporteRoute /> },
      { path: "/CrearServicioRoute", element: <CrearServicioRoute /> },
      { path: "/EnviarEncuesta", element: <EnviarEncuestaRoute /> },
      { path: "/asignarColaborador/:reservacionId", element: <AsignarColaboradorRoute /> },
      { path: "/reservaciones", element: <ReservacionesRoute /> },
      { path: "/editar-servicio/:id", element: <EditarServicioRoute /> },
      { path: "/CrearUsuarioRoute", element: <CrearUsuarioRoute />},
      { path: "/UserFunctionsRoute", element: <UserFunctionsRoute />},
    ],
  },
  {
    path: "/auth",
    element: <Login />,
  },
  { path: "/VerServiciosRoute", element: <VerServiciosRoute /> },
  { path: "/CrearReservaRoute/:id", element: <CrearReservaRoute /> },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
