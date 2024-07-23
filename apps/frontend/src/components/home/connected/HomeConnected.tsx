import { HomePopularGames } from "./popular/HomePopularGames.tsx";
import { HomeReleasedGames } from "./released/HomeReleasedGames.tsx";

export const HomeConnected = () => {
  return (
    <div className="min-h-screen space-y-10 bg-gradient-to-r from-blue-900 from-25% via-black via-60% to-blue-900 p-8">
      <p className="bg-red-400 w-fit mx-auto text-xs md:text-sm rounded-md text-white p-2 bg-opacity-70 text-pretty max-w-[700px]">En periodos de inactividad puede que haya un delay de un minuto para mostrar los datos, esto es debido a la capa gratuita que ofrece el servidor que estoy usando (Render.com). Disculpen las molestias!</p>
      <HomePopularGames />
      <HomeReleasedGames />
    </div>
  );
};
