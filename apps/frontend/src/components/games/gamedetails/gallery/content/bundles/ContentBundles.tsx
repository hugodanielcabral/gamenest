import { Link } from "react-router-dom";
import { ContentCard } from "../card/ContentCard";

interface ContentBundlesProps {
  bundles: {
    id: number;
    cover: {
      id: number;
      url: string;
    };
    name: string;
    slug: string;
  }[];
}
export const ContentBundles = ({ bundles }: ContentBundlesProps) => {
  return (
    <div>
      <h2 className="sm:text-text-lg text-center text-base uppercase tracking-wider text-blue-400 md:text-xl lg:text-2xl xl:text-3xl">
        Bundles
      </h2>

      <div className="flex gap-4 overflow-x-auto p-2 md:flex-wrap md:overflow-visible">
        {bundles?.map((bundle) => (
          <Link
            to={`/games/${bundle?.slug}`}
            className="relative flex-shrink-0"
          >
            <ContentCard coverUrl={bundle?.cover?.url} title={bundle?.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};
