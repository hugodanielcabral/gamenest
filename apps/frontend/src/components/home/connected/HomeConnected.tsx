import { HomePopularGames } from "./popular/HomePopularGames.tsx";
import { HomeReleasedGames } from "./released/HomeReleasedGames.tsx";
import { Button } from "../../ui/button/Button";
import { useState } from "react";

export const HomeConnected = () => {
  const [hideMessage, setHideMessage] = useState(
    localStorage.getItem("hideMessage") === "true" || false,
  );

  const handleHideMessage = () => {
    setHideMessage(true);
    localStorage.setItem("hideMessage", "true");
  };

  return (
    <div className="min-h-screen space-y-10 bg-gradient-to-r from-blue-900 from-25% via-black via-60% to-blue-900 p-8">
      <div
        role="alert"
        className={`alert alert-warning relative mx-auto w-fit max-w-[700px] ${hideMessage ? "hidden" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-pretty text-xs text-base-300 md:text-sm">
          En periodos de inactividad puede que haya un delay de un minuto para
          mostrar los datos, esto es debido a la capa gratuita que ofrece el
          servidor que estoy usando (Render.com). Disculpen las molestias!
        </p>{" "}
        <div className="absolute right-2 top-0">
          <span
            className="cursor-pointer rounded-md text-base text-white md:text-lg"
            onClick={handleHideMessage}
          >
            ❌
          </span>
        </div>
      </div>
      <HomePopularGames />
      <HomeReleasedGames />
    </div>
  );
};
