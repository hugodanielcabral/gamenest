import propTypes from "prop-types";
import { Badge } from "../../../../ui/badge/Badge";

export const CardHoursPlayed = ({ gameData }) => {
  const HOURS_PLAYED =
    gameData.hours_played == null ? 0 : gameData.hours_played;

  return (
    <Badge className="col-span-2 row-span-1 mx-auto self-center bg-transparent before:content-['🕓']">
      <p className="text-info text-base md:text-xl font-semibold">
        Total played: <span className="text-white">{HOURS_PLAYED}</span>
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
