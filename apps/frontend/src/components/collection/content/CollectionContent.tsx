import { CollectionList } from "../list/CollectionList";
import { CollectionContentSkeleton } from "./skeleton/CollectionContentSkeleton.tsx";

interface CollectionContentProps {
  deleteGameCollection: (collection_id: number) => void;
  collections: {
    id: number;
    collection_id: number;
    game_id: string;
    game_name: string;
    game_slug: string;
    game_cover: string;
    hours_played: number;
    minutes_played: number;
    rating: number;
    ownership_name: string;
    status_name: string;
    platform_name: string;
    store_name: string;
    is_favorite: boolean;
    difficulty: string;
    cover: {
      id: number;
      url: string;
    };
    start_date: string;
    finish_date: string;
    amount_paid: string;
    user_id: string;
  }[];
  isLoading: boolean;
}

export const CollectionContent = ({
  deleteGameCollection,
  collections,
  isLoading,
}: CollectionContentProps) => {
  return (
    <>
      {isLoading ? (
        <CollectionContentSkeleton />
      ) : (
        <CollectionList
          collections={collections}
          deleteGameCollection={deleteGameCollection}
        />
      )}
    </>
  );
};
