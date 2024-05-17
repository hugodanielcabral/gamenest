import propTypes from "prop-types";
import { CardBackground } from "../../../../../ui/cardBackground/cardBackground";

export const AdditionalInfoSpecifications = ({ data }) => {
  return (
    <CardBackground className="col-span-3 md:col-span-1  flex flex-col">
      <h2 className="text-center text-xl md:text-2xl mb-2 text-info">
        Specifications
      </h2>
      {!data.specifications ? (
        <p className="text-center col-span-4 text-white">
          No specifications available.
        </p>
      ) : (
        <article className="flex justify-evenly flex-wrap">
          <section className="shrink-0">
            <h3 className="text-left text-sm md:text-lg lg:text-xl text-white">
              Franchises
            </h3>
            {
              <ul>
                {data?.franchises?.length < 1 ? (
                  data?.franchises.map((franchise) => (
                    <li key={franchise.id} className="text-sm md:text-lg">
                      {franchise.name}
                    </li>
                  ))
                ) : (
                  <li>None</li>
                )}
              </ul>
            }
          </section>
          <section className="shrink-0">
            <h3 className="text-left text-sm md:text-lg lg:text-xl text-white">
              Game Modes
            </h3>
            {
              <ul>
                {data?.game_modes.map((gameMode) => (
                  <li key={gameMode.id} className="text-sm md:text-lg">
                    {gameMode.name}
                  </li>
                )) || <li>None</li>}
              </ul>
            }
          </section>
          <section className="shrink-0">
            <h3 className="text-left text-sm md:text-lg lg:text-xl text-white">
              Genres
            </h3>
            {
              <ul>
                {data?.genres.map((genre) => (
                  <li key={genre.id} className="text-sm md:text-lg">
                    {genre.name}
                  </li>
                )) || <li>None</li>}
              </ul>
            }
          </section>
        </article>
      )}
    </CardBackground>
  );
};

AdditionalInfoSpecifications.propTypes = {
  data: propTypes.object,
};
