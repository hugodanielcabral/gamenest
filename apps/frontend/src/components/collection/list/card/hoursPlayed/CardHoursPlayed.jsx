import propTypes from "prop-types";
import { Badge } from "../../../../ui/badge/Badge";

export const CardHoursPlayed = ({ gameData }) => {
  const HOURS_PLAYED =
    gameData.total_played == null ? 0 : gameData.total_played;

  return (
    <Badge className="col-span-2 row-span-1 mx-auto self-center bg-transparent">
      <p className="text-base text-white md:text-lg">
        <span className="font-bold text-white">{HOURS_PLAYED}</span> horas
        jugadas
      </p>
    </Badge>
  );
};

CardHoursPlayed.propTypes = {
  gameData: propTypes.object.isRequired,
};

CardHoursPlayed.defaultProps = {
  gameData: {},
};
