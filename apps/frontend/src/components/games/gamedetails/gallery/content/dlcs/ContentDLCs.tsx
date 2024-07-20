import { Link } from "react-router-dom";
import { ContentCard } from "../card/ContentCard";

interface ContentDLCsProps {
  dlcs: {
    id: number;
    cover: {
      id: number;
      url: string;
    };
    name: string;
    slug: string;
  }[];
}

export const ContentDLCs = ({ dlcs }: ContentDLCsProps) => {
  return (
    <div>
      <h2 className="sm:text-text-lg text-center text-base uppercase tracking-wider text-blue-400 md:text-xl lg:text-2xl xl:text-3xl">DLCs</h2>
      <div className="flex gap-4 overflow-x-auto p-2 md:flex-wrap md:overflow-visible">
        {dlcs?.map((dlc) => (
          <Link to={`/games/${dlc?.slug}`} className="relative flex-shrink-0">
            <ContentCard coverUrl={dlc?.cover?.url} title={dlc?.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};
