import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const navGerente = [
    { name: "HOME", href: '/', tooltip: "Inicio" }, 
    { name: "Ver Reservas", href: "/reservasAgrupadas" },
  ];

  const navColaborador = [
    { name: "HOME", href: '/', tooltip: "Inicio" },
    { name: "Mis Reservas", href: "/home-colaborador" },
  ];

  const navAdmin = [
    { name: "HOME", href: '/', tooltip: "Inicio" },
    { name: "Creación de nuevos usuarios", href: "/CrearUsuarioRoute" },
  ];

  const navCliente = [
    { name: "Mis Reservas", href: "/misReservas" },
    { name: "Historial", href: "/historialReservas" },
    { name: "Encuestas", href: "/encuestas" },
  ];

  const navigation = [];
  if (user?.roles?.includes("gerente")) {
    navigation.push(...navGerente);
  }
  if (user?.roles?.includes("colaborador")) {
    navigation.push(...navColaborador);
  }
  if (user?.roles?.includes("admin")) {
    navigation.push(...navAdmin);
  }
  if (user?.roles?.includes("cliente")) {
    navigation.push(...navCliente);
  }

  const handleLogout = () => {
    logoutUser();
    navigate("/auth");
  };

  return (
    <Disclosure as="nav" className="bg-blue-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link to="/" className="text-white text-2xl font-bold">
                INSERV-CHILE
              </Link>
              {/* Navegación */}
              {navigation.length > 0 && (
                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        title={item.tooltip || ""}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {/* Menú de usuario */}
              <Menu as="div" className="relative">
                <Menu.Button className="bg-gray-800 flex text-sm rounded-full">
                <img
                        id='profile-image'
                        className="h-8 w-8 rounded-full"
                        src="../../images/F.png"
                        alt=""
                      />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md py-1 shadow-lg">
                    <Menu.Item>
                      <Link
                        to="/perfil"
                        className="block px-4 py-2 text-sm text-gray-700"
                      >

                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-white-700 w-full text-left"
                      >
                        Cerrar Sesión
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
