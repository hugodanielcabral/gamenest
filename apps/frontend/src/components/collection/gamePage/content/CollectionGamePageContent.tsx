import { ContentAchievement } from "./achievement/ContentAchievement";

interface CollectionGamePageContentProps {
  collection: {
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
}

export const CollectionGamePageContent = ({
  collection,
}: CollectionGamePageContentProps) => {
  return (
    <section className="space-y-4 p-4">
      <ContentAchievement />
    </section>
  );
};
