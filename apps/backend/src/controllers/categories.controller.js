import { GamesRepository } from "../repositories/GamesRepository.js";

const gamePlatforms = {
  pc: 6,
  playstation: "167,48,9,8,7",
  xbox: "169,49,12,11",
  nintendo: "130,37,20",
};

export const gameGenres = [
  {
    id: 2,
    name: "Point-and-click",
    slug: "point-and-click",
    es_name: "Point-and-click",
  },
  {
    id: 4,
    name: "Fighting",
    slug: "fighting",
    es_name: "Lucha",
  },
  {
    id: 5,
    name: "Shooter",
    slug: "shooter",
    es_name: "Disparos",
  },
  {
    id: 7,
    name: "Music",
    slug: "music",
    es_name: "Música",
  },
  {
    id: 8,
    name: "Platform",
    slug: "platform",
    es_name: "Plataformas",
  },
  {
    id: 9,
    name: "Puzzle",
    slug: "puzzle",
    es_name: "Puzzle",
  },
  {
    id: 10,
    name: "Racing",
    slug: "racing",
    es_name: "Carreras",
  },
  {
    id: 11,
    name: "Real Time Strategy (RTS)",
    slug: "real-time-strategy-rts",
    es_name: "Estrategia en tiempo real",
  },
  {
    id: 12,
    name: "Role-playing (RPG)",
    slug: "role-playing-rpg",
    es_name: "Rol",
  },
  {
    id: 13,
    name: "Simulator",
    slug: "simulator",
    es_name: "Simulación",
  },
  {
    id: 14,
    name: "Sport",
    slug: "sport",
    es_name: "Deportes",
  },
  {
    id: 15,
    name: "Strategy",
    slug: "strategy",
    es_name: "Estrategia",
  },
  {
    id: 16,
    name: "Turn-based strategy (TBS)",
    slug: "turn-based-strategy-tbs",
    es_name: "Estrategia por turnos",
  },
  {
    id: 24,
    name: "Tactical",
    slug: "tactical",
    es_name: "Táctico",
  },
  {
    id: 25,
    name: "Hack and slash/Beat 'em up",
    slug: "hack-and-slash-beat-em-up",
    es_name: "Hack and slash",
  },
  {
    id: 26,
    name: "Quiz/Trivia",
    slug: "quiz-trivia",
    es_name: "Quiz",
  },
  {
    id: 30,
    name: "Pinball",
    slug: "pinball",
    es_name: "Pinball",
  },
  {
    id: 31,
    name: "Adventure",
    slug: "adventure",
    es_name: "Aventura",
  },
  {
    id: 32,
    name: "Indie",
    slug: "indie",
    es_name: "Indie",
  },
  {
    id: 33,
    name: "Arcade",
    slug: "arcade",
    es_name: "Arcade",
  },
  {
    id: 34,
    name: "Visual Novel",
    slug: "visual-novel",
    es_name: "Novela visual",
  },
  {
    id: 35,
    name: "Card & Board Game",
    slug: "card-and-board-game",
    es_name: "Cartas y tablero",
  },
  {
    id: 36,
    name: "MOBA",
    slug: "moba",
    es_name: "MOBA",
  },
];

export const getPlatform = async (req, res) => {
  let { page = 1 } = req.query;
  const { platform } = req.params;

  try {
    const body = `fields name, first_release_date, rating, slug, cover.url, genres.name, platforms.abbreviation, platforms.name,release_dates.platform.name, release_dates.game.name, release_dates.date,parent_game.name, parent_game.slug, version_parent.name, version_parent.slug ;where platforms.name ~ *"${platform}"* & rating > 1 & themes != (42) & cover.url != null;limit 12; offset ${
      (page - 1) * 12
    };`;

    const data = await GamesRepository.get(body);

    const totalPages = await GamesRepository.get(body, "games/count");

    res.status(200).json({
      games: data,
      totalPages: totalPages?.count,
      category: gamePlatforms[platform] || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGenre = async (req, res) => {
  let { page = 1 } = req.query;
  const { genre } = req.params;

  try {
    const body = `fields name, first_release_date, rating, slug, cover.url,genres, genres.name, platforms.abbreviation, platforms.name,release_dates.platform.name, release_dates.game.name, release_dates.date,parent_game.name, parent_game.slug, version_parent.name, version_parent.slug ;where genres.name ~ *"${genre}"* & rating > 1 & themes != (42) & cover.url != null;limit 12; offset ${
      (page - 1) * 12
    };`;

    const data = await GamesRepository.get(body);

    const totalPages = await GamesRepository.get(body, "games/count");

    res.status(200).json({
      games: data,
      totalPages: totalPages?.count,
      category: gameGenres.find((g) => g.slug === genre).id || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
