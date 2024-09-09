interface GameProps {
  game: {
    id: number;
    name: string;
    cover: {
      id: number;
      url: string;
    };
    slug: string;
    platforms: {
      id: number;
      abbreviation: string;
      name: string;
    }[];
    screenshots: {
      id: number;
      url: string;
    }[];
  };
}

export type { GameProps };
