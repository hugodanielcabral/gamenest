export interface IGDBPlatform {
  id: number;
  abbreviation: string;
  name: string;
}

export interface IGDBGamesProps {
  id: number;
  name: string;
  cover: {
    id: number;
    url: string;
  };
  hypes: number;
  rating: number;
  release_dates: {
    id: number;
    human: string;
  }[];
  slug: string;
  platforms: IGDBPlatform[];
  first_release_date: number;
  parent_game?: { id: string; name: string; slug: string };
  version_parent?: { id: string; name: string; slug: string };
  category?: number;
}

export interface IGDBTimeToBeat {
  id: number;
  game: number;
  hastily: number;
  normally: number;
  completely: number;
}
