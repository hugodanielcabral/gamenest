import { useState } from "react";
import { AchievementManagerList } from "./list/AchievementManagerList.js";
import { Button } from "../../../ui/button/Button.tsx";
import toast from "../../../../utils/toast.js";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useSteamAchievement } from "../../../../hooks/useSteamAchievement.js";

type SteamAchievement = {
  name: string;
  displayName: string;
  description: string;
  icon: string;
  icongray: string;
};

type GamePageAchievementManagerProps = {
  gameData: {
    steamData: {
      achievements: SteamAchievement[];
    };
  };
  gameSlug: string;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const GamePageAchievementManager = ({
  gameData,
  gameSlug,
}: GamePageAchievementManagerProps) => {
  const [selectedAchievement, setSelectedAchievement] =
    useState<SteamAchievement | null>(null);
  const [buttonHidden, setButtonHidden] = useState(true);

  const { achievedAchievements, isLoading, unachievedAchievements,setAchievedAchievements,setUnachievedAchievements } =
    useSteamAchievement(gameData, gameSlug);

  const handleOnMoveToAchievedAchievements = () => {
    if (!selectedAchievement) return;

    const foundAchievement = achievedAchievements.find(
      (achievement) => achievement.name === selectedAchievement.name,
    );

    if (foundAchievement) {
      setSelectedAchievement(null);
      return;
    }

    setAchievedAchievements(
      [...achievedAchievements, selectedAchievement].sort((a, b) => {
        if (a.name < b.name) return -1;

        if (a.name > b.name) return 1;

        return 0;
      }),
    );

    const filteredAchievement = unachievedAchievements.filter(
      (achievement) => achievement.name !== selectedAchievement.name,
    );
    setUnachievedAchievements(filteredAchievement);
    setSelectedAchievement(null);
  };

  const handleOnMoveToUnachievedAchievements = () => {
    if (!selectedAchievement) return;

    const foundAchievement = unachievedAchievements.find(
      (achievement) => achievement.name === selectedAchievement.name,
    );

    if (foundAchievement) {
      setSelectedAchievement(null);
      return;
    }

    setUnachievedAchievements(
      [...unachievedAchievements, selectedAchievement].sort((a, b) => {
        if (a.name < b.name) return -1;

        if (a.name > b.name) return 1;

        return 0;
      }),
    );
    const filteredAchievement = achievedAchievements.filter(
      (achievement) => achievement.name !== selectedAchievement.name,
    );
    setAchievedAchievements(filteredAchievement);
    setSelectedAchievement(null);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonHidden(true);
    try {
      await fetch(`${BASE_URL}/achievement`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          gameSlug,
          achievements: achievedAchievements.map(
            (achievement) => achievement.name,
          ),
        }),
      });

      toast(`Cambios guardados correctamente`, "success", "#fff");
    } catch (error) {
      console.log(error);
    }
  };

  const enableButton = () => {
    if (!selectedAchievement) return;

    setButtonHidden(false);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {!isLoading ? (
        <div className="flex flex-col gap-y-2 rounded-md bg-base-100 bg-opacity-50 p-6 md:flex-row md:gap-x-2">
          <div className="flex-1 space-y-2">
            <h2 className="text-center text-base text-gray-300 sm:text-lg md:text-xl">
              No obtenidos: {" "}
              <span className="">
                {unachievedAchievements.length}
              </span>
            </h2>
            {unachievedAchievements.length > 0 ? (
              <AchievementManagerList
                achievements={unachievedAchievements}
                selectedAchievement={selectedAchievement}
                setSelectedAchievement={setSelectedAchievement}
                isAchieved={false}
              />
            ) : (
              <div className="text-center text-white">
                Ya desbloqueaste todos los logros. ¡Felicidades!
              </div>
            )}
          </div>
          <div className="flex items-center justify-center md:flex-col">
            <span
              className="rotate-90 cursor-pointer text-2xl md:rotate-0"
              onClick={() => {
                handleOnMoveToUnachievedAchievements();
                enableButton();
              }}
            >
              <FaAngleLeft size={40} className="hover:text-white" />
            </span>
            <span
              className="rotate-90 cursor-pointer text-2xl md:rotate-0"
              onClick={() => {
                handleOnMoveToAchievedAchievements();
                enableButton();
              }}
            >
              <FaAngleRight size={40} className="hover:text-white" />
            </span>
          </div>
          <div className="flex-1 space-y-2">
            <h2 className="text-center text-base sm:text-lg md:text-xl text-yellow-500">
              Obtenidos: {" "}
              <span className="">
                {achievedAchievements.length}
              </span>
            </h2>
            {achievedAchievements.length > 0 ? (
              <AchievementManagerList
                achievements={achievedAchievements}
                selectedAchievement={selectedAchievement}
                setSelectedAchievement={setSelectedAchievement}
                isAchieved={true}
              />
            ) : (
              <div className="text-center text-white">
                Aún no desbloqueaste ningún logro. 
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full h-screen">
          <div className="flex items-center justify-center w-full h-full">
            <div className="loader"></div>
          </div>
        </div>
      )}
      <Button
        className={`${buttonHidden ? "hidden" : ""} w-full md:w-52`}
        type="submit"
      >
        Guardar cambios
      </Button>
    </form>
  );
};
