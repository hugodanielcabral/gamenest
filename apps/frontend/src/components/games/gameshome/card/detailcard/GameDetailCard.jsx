import propTypes from "prop-types";
export const GameDetailCard = ({ cover, name, platforms, summary }) => {
  return (
    <div className="flex flex-1 gap-x-3">
      <img
        src={
          cover
            ? `${cover.url.replace("t_thumb", "t_cover_big")}`
            : "https://via.placeholder.com/300x400?text=No+Cover+Available"
        }
        alt={`${name} cover`}
        className="object-cover w-20 h-full md:w-36 md:h-full"
      />
      <div className="flex-1">
        <h2 className="font-bold text-balance line-clamp-1 text-base-content">
          {name}
        </h2>
        <ul className="flex justify-start gap-4 my-1">
          {platforms
            .filter((platform) => platform.abbreviation != null)
            .map((platform) => {
              return (
                <li key={platform.id} className="text-error">
                  {platform.abbreviation}
                </li>
              );
            })}
        </ul>
        <p className="line-clamp-2 lg:line-clamp-3 text-base-content">
          {summary}
        </p>
      </div>
    </div>
  );
};

GameDetailCard.propTypes = {
  cover: propTypes.object.isRequired,
  name: propTypes.string.isRequired,
  platforms: propTypes.array.isRequired,
  summary: propTypes.string.isRequired,
};
