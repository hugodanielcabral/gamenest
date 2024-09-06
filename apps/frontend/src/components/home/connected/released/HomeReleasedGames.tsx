import { AnticipatedGames } from "./anticipated/AnticipatedGames";
import { LatestGames } from "./latest/LatestGames";
import { UpComingGames } from "./upcoming/UpComingGames";
import { FaGrinHearts } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import { FaHourglass } from "react-icons/fa6";
import { useState } from "react";

interface SectionProps {
  name: string;
  title: string;
  component: React.ReactNode;
  icon?: JSX.Element;
}

const sections: SectionProps[] = [
  {
    name: "latest",
    title: "Últimos lanzamientos",
    component: <LatestGames />,
    icon: (
      <MdCelebration className="size-4 text-info text-opacity-75 md:size-6" />
    ),
  },
  {
    name: "soon",
    title: "Próximamente",
    component: <UpComingGames />,
    icon: (
      <FaHourglass className="size-4 text-info text-opacity-75 md:size-6" />
    ),
  },
  {
    name: "anticipated",
    title: "Más anticipados",
    component: <AnticipatedGames />,
    icon: (
      <FaGrinHearts className="size-4 text-info text-opacity-75 md:size-6" />
    ),
  },
];

export const HomeReleasedGames = () => {
  const [currentContent, setCurrentContent] = useState("latest");

  const handleOnChangeContent = (content: string) => {
    setCurrentContent(content);
  };

  return (
    <article className="p-8">
      <div className="mb-4 flex justify-center space-x-12">
        {sections.map((section) => (
          <button
            key={section.name}
            className={`group flex flex-col items-center justify-center`}
            onClick={() => handleOnChangeContent(section.name)}
            aria-selected={currentContent === section.name}
            aria-controls={`section-${section.name}`}
          >
            <span
              className={`transition-opacity duration-500 ease-in-out ${currentContent === section.name ? "opacity-100" : "opacity-0"}`}
            >
              {section.icon}
            </span>
            <span
              className={`text-xs group-hover:text-opacity-90 md:text-lg lg:text-xl ${currentContent === section.name ? "text-info" : "text-gray-300"} `}
            >
              {section.title}
            </span>
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        {sections.map((section) => (
          <div
            key={section.name}
            className={`w-max mx-auto gap-2 ${currentContent === section.name ? "flex" : "hidden"}`}
          >
            {section.component}
          </div>
        ))}
      </div>
    </article>
  );
};
