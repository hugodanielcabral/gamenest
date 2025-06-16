export interface IGames {
  id: number;
  cover: {
    id: number;
    url: string;
  };
  first_release_date?: number;
  genres: {
    id: number;
    name: string;
  }[];
  involved_companies: {
    id: number;
    company: {
      id: number;
      name: string;
    };
    developer: boolean;
  }[];
  name: string;
  platforms: {
    id: number;
    name: string;
  }[];
  slug: string;
  summary: string;
  storyline?: string;
  videos?: {
    id: number;
    video_id: string;
  }[];
  version_title?: string;
  rating: number;
}

export interface IGamesCount {
  name: "string";
  count: number;
}

export interface IPopScore {
  id: number;
  game_id: number;
  popularity_type: number;
  value: number;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  headers?: any;
}
