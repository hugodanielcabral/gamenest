
export interface GamesProps {
  fetchData: {
    id: string;
    name: string;
    cover: { id: string; url: string };
    slug: string;
  }[];
  isLoading: boolean;
}

interface Game {
    id: string;
    name: string;
    cover: { id: string; url: string };
    slug: string;
}

export interface FormState {
  title: string;
  description: string;
  visibility: boolean;
  games: Game[];
}
