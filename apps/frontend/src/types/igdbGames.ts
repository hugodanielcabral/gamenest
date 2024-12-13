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
}
