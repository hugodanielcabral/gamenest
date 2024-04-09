import getPlatformAbbreviations from "../../../../utils/getPlatformAbbreviations.js";
import { CardBackground } from "../../../ui/cardBackground/CardBackground";

export const GamesFinderCard = ({ gamesData }) => {
  return gamesData.map((game) => (
    <CardBackground
      key={game.id}
      className="flex gap-2 max-h-[200px] shadow-black"
    >
      <img
        src={`${game?.cover?.url.replace("thumb", "cover_big")}`}
        loading="lazy"
        alt={`${game?.name} cover`}
        className="flex-grow-0 w-24"
      />
      <div className="flex-grow basis-[600px]">
        <h2 className="text-lg md:text-1xl lg:text-2xl font-bold">
          {game?.name}
        </h2>
        <ul className="flex gap-x-2 flex-wrap *:p-1 *:bg-error *:text-white *:font-semibold my-2 *:md:text-sm *:text-xs *:lg:text-base line">
          {getPlatformAbbreviations(game).map((platform) => (
            <li key={platform} className="rounded-md p-1 bg-error text-white">
              {platform}
            </li>
          ))}
        </ul>
        <p className="text-balance line-clamp-2 md:line-clamp-3">
          {game?.summary}
        </p>
      </div>
      <div className="md:flex flex-col items-center justify-center gap-y-3 text-success hidden">
        <div
          className="radial-progress flex items-center self-center"
          style={{ "--value": 50 }}
          role="progressbar"
        >
          100%
        </div>
        <h3 className="font-semibold text-sm">Pretty good!</h3>
      </div>
    </CardBackground>
  ));
};
