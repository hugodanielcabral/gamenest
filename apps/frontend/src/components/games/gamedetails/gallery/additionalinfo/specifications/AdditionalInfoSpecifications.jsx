import propTypes from "prop-types";

export const AdditionalInfoSpecifications = ({ data }) => {
  return (
    <div className="col-span-3 md:col-span-1 bg-base-200/90 shadow-lg rounded-sm border-2 border-white/10 p-3">
      <h2 className="text-center text-3xl md:text-4xl font-semibold mb-2 text-info">
        Specifications
      </h2>
      <h3 className="text-left text-xl md:text-xl text-white">Franchises</h3>
      {
        <ul>
          {data?.franchises?.length < 1 ? (
            data?.franchises.map((franchise) => (
              <li key={franchise.id}>{franchise.name}</li>
            ))
          ) : (
            <li>None</li>
          )}
        </ul>
      }
      <h3 className="text-left text-xl md:text-xl text-white">Game Modes</h3>
      {
        <ul>
          {data?.game_modes.map((gameMode) => (
            <li key={gameMode.id}>{gameMode.name}</li>
          )) || <li>None</li>}
        </ul>
      }
      <h3 className="text-left text-xl md:text-xl text-white">Genres</h3>
      {
        <ul>
          {data?.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          )) || <li>None</li>}
        </ul>
      }
    </div>
  );
};

AdditionalInfoSpecifications.propTypes = {
  data: propTypes.object,
};
