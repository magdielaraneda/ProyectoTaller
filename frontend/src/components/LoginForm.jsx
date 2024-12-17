import 'tailwindcss/tailwind.css';
import { login } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserCircleIcon } from '@heroicons/react/24/solid';

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      await login(data);
      navigate('/');
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      alert('Credenciales incorrectas. Intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/1.jpg')",
          zIndex: '-1',
          filter: 'brightness(0.8)',
        }}
      ></div>

      {/* Contenedor con imagen al lado izquierdo */}
      <div
  className="absolute top-[60%] left-[20%] transform -translate-y-1/2 w-64 h-40 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform duration-300"
  onClick={() => navigate('/VerServiciosRoute')}
>
  <img
    src="/images/OP.jpg"
    alt="Haz click aquí para ver los servicios"
    className="w-full h-full object-cover"
  />
</div>



      {/* Formulario de inicio de sesión */}
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden lg:flex">
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 p-12">
          <h1 className="text-4xl font-bold text-white mb-4">¡Bienvenido a INSERV-CHILE!</h1>
          <p className="text-lg text-white">
            Accede aquí para ver la variedad de servicios que ofrecemos.
          </p>
        </div>
        <div className="lg:w-1/2 p-8">
          <div className="flex justify-center mb-6">
            <UserCircleIcon className="h-24 w-24 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Inicio de Sesión</h2>
          <p className="text-lg text-black">
                    Login para funcionarios
          </p>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="correo_ejemplo@email.com"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring"
                {...register('email', { required: 'El correo es obligatorio' })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring"
                {...register('password', { required: 'La contraseña es obligatoria' })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
