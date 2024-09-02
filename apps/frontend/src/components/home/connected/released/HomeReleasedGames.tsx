import { AnticipatedGames } from "./anticipated/AnticipatedGames";
import { LatestGames } from "./latest/LatestGames";
import { UpComingGames } from "./upcoming/UpComingGames";
import { FaGrinHearts } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import { FaHourglass } from "react-icons/fa6";

interface SectionTitleProps {
  title: string;
}

interface SectionProps {
  title: string;
  component: React.ReactNode;
  icon?: JSX.Element;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <>
      <h3 className="text-center text-xs text-info md:text-base lg:text-xl xl:text-xl">
        {title}
      </h3>
    </>
  );
};

const sections: SectionProps[] = [
  { title: "Últimos lanzamientos", component: <LatestGames />, icon: <MdCelebration className="size-6 text-red-400" /> },
  { title: "Próximamente", component: <UpComingGames />, icon: <FaHourglass className="size-4 md:size-6 text-red-400" /> },
  {
    title: "Más anticipados",
    component: <AnticipatedGames />,
    icon: <FaGrinHearts className="size-6 text-red-400" />,
  },
];

export const HomeReleasedGames = () => {
  return (
    <article className="grid gap-4 p-4 *:flex *:flex-col sm:grid-cols-3">
      {sections.map(({ title, component, icon }) => (
        <section key={title} className="flex flex-col space-y-4">
          <div className="flex gap-2 self-center flex-col justify-center items-center">
            {icon}
            <SectionTitle title={title} />
          </div>
          {component}
        </section>
      ))}
    </article>
  );
};
