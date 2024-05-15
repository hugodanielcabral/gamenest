import propTypes from "prop-types";
import getPlaformAbbreviation from "../../../../../data/platformsAbb";
import { Badge } from "../../../../ui/badge/Badge";

export const CardPlatform = ({ gameData }) => {
  const PLATFORM_NAME = gameData?.platform_name;

  const platformAbb = getPlaformAbbreviation(PLATFORM_NAME);

  return (
    <Badge className="self-center bg-transparent">
      <p className="font-bold text-info text-base md:text-lg">{platformAbb}</p>
    </Badge>
  );
};

CardPlatform.propTypes = {
  gameData: propTypes.object.isRequired,
};

CardPlatform.defaultProps = {
  gameData: {},
};
