import propTypes from "prop-types";
export const HeaderGameInfo = ({ game }) => {
  const { name, summary } = game;
  return (
    <div className="col-span-5 md:col-span-3 *:my-5">
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-lg max-w-[80ch] line-clamp-3">{summary}</p>
      <div className="flex gap-x-1">
        <p className="text-base font-bold">Platforms:</p>
        <ul className="flex gap-x-2">
          {game.platforms.map((platform) => (
            <li key={platform.id} className="text-base">
              {platform.abbreviation}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className="flex gap-x-2 *:bg-base-content *:text-base-300 *:rounded-md *:p-1 *:font-bold">
          {game.genres.map((genre) => (
            <li key={genre.id} className="text-base">
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

HeaderGameInfo.propTypes = {
  game: propTypes.object.isRequired,
};
