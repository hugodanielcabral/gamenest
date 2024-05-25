import propTypes from "prop-types";
import { CardBackground } from "../../../../../ui/cardBackground/cardBackground";
import { SpecificationsList } from "./list/SpecificationsList";

export const AdditionalInfoSpecifications = ({ data }) => {
  return (
    <CardBackground className="col-span-3 md:col-span-1  flex flex-col">
      <h2 className="text-center text-xl md:text-2xl mb-2 text-info">
        Especificaciones
      </h2>
      <article className="flex justify-evenly flex-wrap">
        {data?.franchises && (
          <SpecificationsList
            specificationTitle="Franquicias"
            specification={data.franchises}
          />
        )}

        {data?.game_modes && (
          <SpecificationsList
            specificationTitle="Modos de juego"
            specification={data.game_modes}
          />
        )}
        {data?.genres && (
          <SpecificationsList
            specificationTitle="Géneros"
            specification={data.genres}
          />
        )}
      </article>
    </CardBackground>
  );
};

AdditionalInfoSpecifications.propTypes = {
  data: propTypes.object,
};
