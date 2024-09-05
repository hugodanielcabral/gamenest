interface GameDetailsProps {
  data: {
    id: number;
    name: string;
    cover: { id: number; url: string };
    platforms: { id: number; abbreviation: string; name: string }[];
    screenshots: { id: number; url: string }[];
    videos: { id: number; video_id: string }[];
    summary: string;
    storyline: string;
    genres: { id: number; name: string }[];
    involved_companies: {
      company: { id: number; name: string };
      developer: boolean;
    }[];
    release_dates: {
      id: number;
      date: number;
      game: { id: number; name: string };
      platform: { id: number; name: string };
    }[];
    bundles: {
      id: number;
      cover: { id: number; url: string };
      name: string;
      slug: string;
    }[];
    dlcs: {
      id: number;
      cover: { id: number; url: string };
      name: string;
      slug: string;
    }[];
  } | null;
  isLoading: boolean;
}

interface GameDetailsContentProps {
  gameDetail: {
    id: number;
    name: string;
    cover: { id: number; url: string };
    platforms: { id: number; abbreviation: string; name: string }[];
    screenshots: { id: number; url: string }[];
    videos: { id: number; video_id: string }[];
    summary: string;
    storyline: string;
    genres: { id: number; name: string }[];
    involved_companies: {
      company: { id: number; name: string };
      developer: boolean;
    }[];
    release_dates: {
      id: number;
      date: number;
      game: { id: number; name: string };
      platform: { id: number; name: string };
    }[];
    bundles: {
      id: number;
      cover: { id: number; url: string };
      name: string;
      slug: string;
    }[];
    dlcs: {
      id: number;
      cover: { id: number; url: string };
      name: string;
      slug: string;
    }[];
  };
  gameSlug?: string;
}

export type { GameDetailsProps, GameDetailsContentProps };
