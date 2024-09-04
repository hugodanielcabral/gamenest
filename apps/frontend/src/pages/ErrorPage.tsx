import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button/Button.tsx";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="grid h-screen place-content-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-700 via-red-800 to-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-white">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-400 sm:text-4xl">
          Oops!
        </p>

        <p className="mt-4 text-gray-400">
          No se encontró la página solicitada.
        </p>

        <Button
          onClick={() => navigate("/")}
          className="mt-4 bg-red-500 hover:bg-red-500 hover:bg-opacity-70"
        >
          Regresar a la página principal
        </Button>
      </div>
    </div>
  );
};
