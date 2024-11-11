export interface Game {
  list_games_id?: number;
  list_id?: number;
  game_id?: number | string;
  game_slug: string;
  game_name: string;
  game_cover: string;
}

export interface List {
  list_id: number;
  title: string;
  description: string;
  user_id: number;
  visibility: string;
  created_on: string;
  updated_on: string;
  username: string;
  total_games: number;
  total_likes: string;
}

export type OwnedGames = number[];

export interface ListsProps {
  fetchData: {
    list: List;
    games: Game[];
    ownedGames: OwnedGames;
  };
  isLoading: boolean;
}