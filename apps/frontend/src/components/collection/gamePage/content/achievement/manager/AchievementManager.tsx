import type { SteamAchievement } from "../../../../../../types/steamAchievement";
import { useState } from "react";
import { Button } from "../../../../../ui/button/Button";
import { Icon } from "../../../../../ui/icon/Icon";
import clsx from "clsx";
import { toast, Toaster } from "sonner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface AchievementManagerProps {
  achievements: SteamAchievement["achievements"];
  gameSlug: string;
  userAchievements: {
    achievement_name: string[];
  }[];
}

interface AchievementProps {
  achievement: SteamAchievement["achievements"][0];
  isSelected: boolean;
  onClick: () => void;
  iconType: "icon" | "iconGray";
}

const AchievementCard = ({
  achievement,
  isSelected,
  onClick,
  iconType,
}: AchievementProps) => (
  <div
    key={achievement.name}
    className={clsx(
      "flex flex-col gap-2 rounded-lg border border-gray-700 bg-base-100 p-2 md:flex-row",
      {
        "bg-gray-700": isSelected,
      },
    )}
    onClick={onClick}
  >
    <img
      src={`${iconType === "icon" ? achievement.icon : achievement.icongray}`}
      alt={achievement.displayName}
      className="h-full sm:h-14 md:h-16 lg:h-20"
    />
    <div className="space-y-1">
      <h3 className="font-nunito text-sm text-white md:text-base lg:text-lg">
        {achievement.displayName}
      </h3>
      <p className="line-clamp-2 hidden text-pretty font-nunito text-xs text-gray-400 md:block md:text-sm lg:text-base">
        {achievement.description}
      </p>
    </div>
  </div>
);

export const AchievementManager = ({
  achievements,
  gameSlug,
  userAchievements,
}: AchievementManagerProps) => {
  const [achievementList, setAchievementList] = useState(
    achievements.filter(
      (achievement) =>
        !userAchievements[0]?.achievement_name?.includes(achievement.name),
    ) || [],
  );
  const [selectedAchievement, setSelectedAchievement] = useState<
    SteamAchievement["achievements"][0] | null
  >(null);
  const [completedAchievements, setCompletedAchievements] = useState<
    SteamAchievement["achievements"]
  >(
    achievements.filter((achievement) =>
      userAchievements[0]?.achievement_name?.includes(achievement.name),
    ) || [],
  );

  const [isSending, setIsSending] = useState(false);
  const [buttonHidden, setButtonHidden] = useState(true);

  const handleMoveToCompleted = () => {
    if (
      !selectedAchievement ||
      completedAchievements.find(
        (achiev) => achiev.name === selectedAchievement.name,
      )
    ) {
      setSelectedAchievement(null);
      return;
    }

    const updatedAchievementList = achievementList.filter(
      (achiev) => achiev.name !== selectedAchievement.name,
    );

    setCompletedAchievements([selectedAchievement, ...completedAchievements]);
    setAchievementList(updatedAchievementList);
    setSelectedAchievement(null);
    setButtonHidden(false);
  };

  const handleMoveToPending = () => {
    if (
      !selectedAchievement ||
      achievementList.find((achiev) => achiev.name === selectedAchievement.name)
    ) {
      setSelectedAchievement(null);
      return;
    }

    const updatedCompletedAchievements = completedAchievements.filter(
      (achiev) => achiev.name !== selectedAchievement?.name,
    );

    setCompletedAchievements(updatedCompletedAchievements);
    setAchievementList([selectedAchievement, ...achievementList]);
    setSelectedAchievement(null);
    setButtonHidden(false);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await fetch(`${BASE_URL}/achievement`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          gameSlug,
          achievements: completedAchievements.map(
            (achievement) => achievement.name,
          ),
        }),
      });

      if (response.status !== 200) {
        toast.error("No se pudo guardar los cambios", {
          duration: 3000,
          className:
            "bg-error text-white text-xs md:text-sm text-white font-nunito",
        });
        setIsSending(false);
        return;
      }

      setIsSending(false);
      setButtonHidden(true);
      toast.success("Cambios guardados correctamente", {
        duration: 3000,
        className:
          "bg-success text-white text-xs md:text-sm text-white font-nunito",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-2 grid grid-cols-2 gap-x-4 space-y-4"
    >
      <div className="sticky top-20 col-span-full grid grid-cols-2 gap-2 bg-base-100 bg-opacity-90 p-2">
        <Button
          className="btn-outline md:col-span-full"
          onClick={handleMoveToCompleted}
          type="button"
          size="sm"
        >
          <Icon
            name="icon-[entypo--arrow-right]"
            className="size-6 md:size-8"
          />
        </Button>
        <Button
          className="btn-outline md:col-span-full"
          variant="warning"
          onClick={handleMoveToPending}
          type="button"
          size="sm"
        >
          <Icon name="icon-[entypo--arrow-left]" className="size-6 md:size-8" />
        </Button>
        <Button
          className={clsx(
            "btn-outline col-span-full mx-auto w-fit opacity-100 transition-all duration-200 ease-in-out",
            {
              "opacity-0": buttonHidden,
            },
          )}
          variant="success"
          size="sm"
          type="submit"
          disabled={isSending}
        >
          <span className="hidden md:block">
            {isSending ? "Guardando..." : "Guardar cambios"}{" "}
          </span>
          <Icon name="icon-[material-symbols--save]" className="block md:hidden size-5" />
        </Button>
      </div>

      <div className="space-y-2">
        <h2 className="text-center font-nunito text-xs text-warning sm:text-sm  md:text-lg lg:text-xl">
          No obtenidos ({achievementList.length})
        </h2>
        {achievementList.map((achievement) => (
          <AchievementCard
            key={achievement.name}
            achievement={achievement}
            isSelected={selectedAchievement?.name === achievement.name}
            onClick={() => setSelectedAchievement(achievement)}
            iconType="iconGray"
          />
        ))}
      </div>
      <div className="space-y-2">
        <h2 className="text-center font-nunito text-xs text-info sm:text-sm md:text-lg lg:text-xl">
          Obtenidos ({completedAchievements.length})
        </h2>
        {completedAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.name}
            achievement={achievement}
            isSelected={selectedAchievement?.name === achievement.name}
            onClick={() => setSelectedAchievement(achievement)}
            iconType="icon"
          />
        ))}
      </div>
      <Toaster position="top-center" visibleToasts={1} />
    </form>
  );
};
