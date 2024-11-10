export interface GamesProps {
  fetchData: {
    id: string;
    name: string;
    cover: { id: string; url: string };
    slug: string;
    list_games_id?: number;
  }[];
  isLoading: boolean;
}

interface Game {
  id: string;
  name: string;
  cover: { id: string; url: string };
  slug: string;
  list_games_id?: number;
}

export interface FormState {
  title: string;
  description: string;
  visibility: boolean;
  games: Game[];
  deletedGameIds?: string[];
}

export enum SendingState {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

export interface ServerErrors {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}
