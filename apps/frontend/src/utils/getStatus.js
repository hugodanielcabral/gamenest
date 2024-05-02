import { GAME_STATUS } from "./constants";

export const getStatus = (statusName) =>
  GAME_STATUS.find((gameStatus) => gameStatus.name === statusName);
