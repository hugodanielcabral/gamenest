import propTypes from "prop-types";

export const GameDetailsHeader = ({ game }) => {
  const { cover, name, summary, rating } = game;
  console.log(cover);
  return (
    <div className="grid justify-center grid-cols-5 col-span-4 p-3 border ">
      {/* Cover */}
      <div className="col-span-5 mx-auto md:mx-0 md:col-span-1 ">
        <img
          src={cover.url.replace("t_thumb", "t_1080p")}
          alt=""
          className="w-64 shadow-lg max-h-96 min-h-72"
        />
      </div>
      {/* Game info */}
      <div className="col-span-5 md:col-span-3">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-lg max-w-[80ch] line-clamp-3">{summary}</p>
      </div>
      {/* Rating */}
      <div className="col-span-5 md:col-span-1">
        <h2 className="text-2xl font-bold">Rating</h2>
        <p>{rating}</p>
      </div>
    </div>
  );
};

GameDetailsHeader.propTypes = {
  game: propTypes.object.isRequired,
};
