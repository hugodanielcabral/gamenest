import { FaRegThumbsDown } from "react-icons/fa";
import { GiThink } from "react-icons/gi";
import { GrStatusUnknown } from "react-icons/gr";
import { LuJoystick } from "react-icons/lu";
import { MdOutlineCelebration } from "react-icons/md";

export const getStatusIconCollection = (platformName) => {
  switch (platformName) {
    case "No status":
      return <GrStatusUnknown size={25} />;
    case "Playing":
      return <LuJoystick size={25} />;
    case "Completed":
      return <MdOutlineCelebration size={25} />;
    case "Dropped":
      return <FaRegThumbsDown size={25} />;
    case "Plan to play":
      return <GiThink size={25} />;
    default:
      return <GrStatusUnknown size={25} />;
  }
};
