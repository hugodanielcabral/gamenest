export interface ICollection {
  collection_id: number;
  game_id: string;
  game_slug: string;
  game_name: string;
  game_cover: string;
  platform_name: string;
  ownership_name: OwnershipType;
  store_name?: string;
  status_name: StatusType;
  start_date?: Date;
  finish_date?: Date;
  rating: ERating;
  amount_paid?: number;
  hours_played?: number;
  is_favorite: boolean;
  minutes_played?: number;
  difficulty?: DifficultyType;
  created_at?: Date;
  updated_at?: Date;
  format_name: FormatType;
}

export interface IPaginationResult {
  data: ICollection[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

type OwnershipType = "Suscripción" | "Compartido" | "Comprado";
type StatusType =
  | "Completado"
  | "Sin estado"
  | "Jugando"
  | "Abandonado"
  | "Pendiente";

type DifficultyType = "Fácil" | "Normal" | "Difícil" | "Muy Difícil";
type FormatType = "Digital" | "Físico";

export enum ERating {
  NO_RATING = 0,
  ONE_STAR = 1,
  TWO_STARS = 2,
  THREE_STARS = 3,
  FOUR_STARS = 4,
  FIVE_STARS = 5,
}
