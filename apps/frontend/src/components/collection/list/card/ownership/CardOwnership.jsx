import { Badge } from "../../../../ui";
import propTypes from "prop-types";

export const CardOwnership = ({ gameData }) => {
  const OWNERSHIP_NAME = gameData?.ownership_name;

  return (
    <Badge className="self-center bg-transparent">
      <p className="text-success text-sm md:text-base">{OWNERSHIP_NAME}</p>
    </Badge>
  );
};

CardOwnership.propTypes = {
  gameData: propTypes.object.isRequired,
};

CardOwnership.defaultProps = {
  gameData: {},
};
