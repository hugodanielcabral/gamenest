import {
  CiCircleCheck,
  CiShare1,
  CiMoneyCheck1,
  CiCircleMore,
} from "react-icons/ci";
import { MdOutlineBedroomParent, MdOutlineCelebration } from "react-icons/md";
import { GiPirateSkull, GiThink } from "react-icons/gi";
import { GrStatusUnknown } from "react-icons/gr";
import { LuJoystick } from "react-icons/lu";
import { FaRegThumbsDown } from "react-icons/fa";

export const ownershipValues = [
  {
    id: 1,
    name: "Owned",
    icon: <CiCircleCheck size={20} />,
  },
  {
    id: 2,
    name: "Shared",
    icon: <CiShare1 size={20} />,
  },
  {
    id: 3,
    name: "Subscription",
    icon: <CiMoneyCheck1 size={20} />,
  },
  {
    id: 4,
    name: "Rented",
    icon: <MdOutlineBedroomParent size={20} />,
  },
  {
    id: 5,
    name: "Unlicensed",
    icon: <GiPirateSkull size={20} />,
  },
  {
    id: 6,
    name: "Other",
    icon: <CiCircleMore size={20} />,
  },
];

export const statusValues = [
  {
    id: 1,
    name: "No status",
    icon: <GrStatusUnknown size={20} />,
  },
  {
    id: 2,
    name: "Playing",
    icon: <LuJoystick size={20} />,
  },
  {
    id: 3,
    name: "Completed",
    icon: <MdOutlineCelebration size={20} />,
  },
  {
    id: 4,
    name: "Dropped",
    icon: <FaRegThumbsDown size={20} />,
  },
  {
    id: 5,
    name: "Plan to play",
    icon: <GiThink size={20} />,
  },
];
