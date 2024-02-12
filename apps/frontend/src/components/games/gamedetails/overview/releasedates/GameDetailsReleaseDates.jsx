import propTypes from "prop-types";

export const GameDetailsReleaseDates = ({ game }) => {
  const gameReleaseDatesPlatforms = [
    {
      name: "PlayStation",
      date: game.release_dates.find(
        (releaseDate) => releaseDate.platform === 48
      ),
    },
    {
      name: "Xbox",
      date: game.release_dates.find(
        (releaseDate) => releaseDate.platform === 49
      ),
    },
    {
      name: "Nintendo",
      date: game.release_dates.find(
        (releaseDate) => releaseDate.platform === 130
      ),
    },
    {
      name: "PC",
      date: game.release_dates.find(
        (releaseDate) => releaseDate.platform === 6
      ),
    },
    {
      name: "iOS",
      date: game.release_dates.find(
        (releaseDate) => releaseDate.platform === 3
      ),
    },
    {
      name: "Android",
      date: game.release_dates.find(
        (releaseDate) => releaseDate.platform === 21
      ),
    },
    {
      name: "Mac",
      date: game.release_dates.find(
        (releaseDate) => releaseDate.platform === 14
      ),
    },
    {
      name: "Linux",
      date: game.release_dates.find(
        (releaseDate) => releaseDate.platform === 41
      ),
    },
    {
      name: "PlayStation Vita",
      date: game.release_dates.find(
        (releaseDate) => releaseDate.platform === 46
      ),
    },
    {
      name: "Wii U",
      date: game.release_dates.find(
        (releaseDate) => releaseDate.platform === 41
      ),
    },
  ];
  return (
    <div className="flex flex-col justify-center col-span-4 p-5 md:col-span-1 gap-y-3 bg-base-100/90">
      <h2 className="text-2xl font-bold text-info">RELEASE DATES</h2>
      {game.release_dates &&
        gameReleaseDatesPlatforms.map(
          (platform) =>
            platform.date && (
              <section key={platform.name}>
                <h3 className="text-xl font-bold">{platform.name}</h3>
                <p className="text-xl">
                  {new Date(platform.date.date * 1000).toLocaleDateString()}
                </p>
              </section>
            )
        )}
    </div>
  );
};

GameDetailsReleaseDates.propTypes = {
  game: propTypes.object.isRequired,
};
