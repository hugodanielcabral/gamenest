import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button/Button.tsx";

export const ErrorPage = () => {
  const navigate = useNavigate();
  

  return (
    <div className="grid h-screen place-content-center min-h-screen bg-gradient-to-b from-gray-800 from-50% to-base-300 px-4">
      <title>404 | GameNest</title>
      <div className="text-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-red-500">404</h1>

        <p className="text-xl font-bold tracking-tight text-gray-300 font-nunito sm:text-2xl md:text-3xl lg:text-4xl">
          Ups! Algo salió mal
        </p>

        <p className="mt-4 text-gray-300 font-nunito text-sm md:text-lg">
          No se encontró la página solicitada.
        </p>

        <Button
          onClick={() => navigate("/")}
          variant="error"
          size="md"
          className="mt-4 btn-outline"
        >
          Regresar a la página principal
        </Button>
      </div>
    </div>
  );
};
