interface GamesFinderPageProps {
  data: {
    id: string;
    name: string;
    cover: { id: string; url: string };
    platforms: { id: string; abbreviation: string; name: string }[];
    slug: string;
    rating: number;
  }[];
  isLoading: boolean;
}


export type { GamesFinderPageProps };
