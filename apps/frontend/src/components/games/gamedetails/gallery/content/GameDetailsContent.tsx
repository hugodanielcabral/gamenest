import { ContentBundles } from "./bundles/ContentBundles";
import { ContentDLCs } from "./dlcs/ContentDLCs";

interface GameDetailsContentProps {
  data: {
    dlcs: {
      id: number;
      cover: {
        id: number;
        url: string;
      };
      name: string;
      slug: string;
    }[];
    bundles: {
      id: number;
      cover: {
        id: number;
        url: string;
      };
      name: string;
      slug: string;
    }[];
  };
}

export const GameDetailsContent = ({ data }: GameDetailsContentProps) => {
  const { dlcs, bundles } = data;


  return (
    <div className="col-span-full mx-auto w-full space-y-4 rounded-md border-2 border-gray-700 bg-base-100 bg-opacity-70 p-4 ">
      {data?.dlcs && data.dlcs.length > 0 && <ContentDLCs dlcs={dlcs} />}
      {data?.bundles && data.bundles.length > 0 && (
        <ContentBundles bundles={bundles} />
      )}
    </div>
  );
};
