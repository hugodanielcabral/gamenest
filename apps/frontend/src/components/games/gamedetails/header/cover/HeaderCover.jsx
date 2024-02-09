import propTypes from "prop-types";

export const HeaderCover = ({ game }) => {
  const { cover } = game;
  return (
    <div className="col-span-5 mx-auto md:mx-0 md:col-span-1 ">
      <img
        src={
          cover
            ? `${cover.url.replace("t_thumb", "t_1080p")}`
            : "https://via.placeholder.com/300x400?text=No+Cover+Available"
        }
        alt=""
        className="w-64 border shadow-md border-base-300 max-h-96 min-h-72"
      />
    </div>
  );
};

HeaderCover.propTypes = {
  game: propTypes.object.isRequired,
};
