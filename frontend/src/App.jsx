import './App.css';

function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-600">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
        <div className="flex justify-center mb-6">
          <img
            src="/vite.svg"
            className="h-16 w-16"
            alt="Vite Logo"
          />
          <img
            src="/assets/react.svg"
            className="h-16 w-16 ml-4"
            alt="React Logo"
          />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Bienvenido a Vite + React
        </h1>
        <p className="text-gray-600 text-center mt-4">
          Edita <code className="bg-gray-100 p-1 rounded">src/App.jsx</code> y guarda para ver los cambios en tiempo real.
        </p>
        <div className="flex justify-center mt-6">
          <button className="bg-indigo-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-600">
            Aprende Más
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
