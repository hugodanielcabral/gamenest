import propTypes from "prop-types";
import { getStatus } from "../../../../../utils/getStatus.js";
import { Badge } from "../../../../ui/badge/Badge.jsx";

export const CardStatus = ({ gameData }) => {
  const STATUS_ICON = getStatus(gameData?.status_name);

  const STATUS_NAME = gameData?.status_name;
  return (
    <Badge className="self-center bg-transparent">
      {/*  <img
        src={STATUS_ICON?.iconId}
        alt={STATUS_NAME}
        className="size-5 mr-1"
      /> */}
      <p className="text-error text-sm">{STATUS_NAME}</p>
    </Badge>
  );
};

CardStatus.propTypes = {
  gameData: propTypes.object.isRequired,
};

CardStatus.defaultProps = {
  gameData: {},
};
