import type { GameDetailsContentProps } from "../../../../types/gameDetails";
import { ContentDescription } from "./description/ContentDescription";
import { Collapse } from "../../../ui/collapse/Collapse";
import { DateTime } from "luxon";
import { genresIcons, genresTranslate } from "../../../../data/genresData";
import { Icon } from "../../../ui/icon/Icon";
import { DLCs } from "./dlcs/DLCs";
import { VideoContent } from "./videoContent/VideoContent";
import { Link } from "react-router-dom";

export const GameDetailsContent = ({ gameDetail }: GameDetailsContentProps) => {
  const publishers =
    gameDetail?.involved_companies?.filter((company) => !company.developer) ||
    [];

  const developers =
    gameDetail?.involved_companies?.filter((company) => company.developer) ||
    [];

  return (
    <section className="grid grid-cols-1 gap-8 p-4 lg:grid-cols-3">
      <div className="col-span-2 space-y-4">
        {gameDetail.videos && gameDetail.videos.length && (
          <VideoContent videos={gameDetail.videos} />
        )}
        <div className="divider"></div>
        <ContentDescription
          summary={gameDetail.summary}
          storyline={gameDetail.storyline}
        />

        <div className="divider"></div>

        {gameDetail.bundles || gameDetail.dlcs ? (
          <DLCs gameDetail={gameDetail} />
        ) : null}
      </div>

      <div className="space-y-4">
        <div className="divider flex md:hidden"></div>

        {gameDetail?.genres && gameDetail?.genres.length > 0 && (
          <Collapse
            title="Géneros"
            isOpen={true}
            detailsClassName="text-lg md:text-xl"
          >
            <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
              {gameDetail.genres.map((genre) => (
                <Link
                  key={genre.id}
                  to={`/genre/${genre?.name?.toLowerCase()}`}
                  className="item-center flex justify-between text-pretty rounded-md border border-gray-700 bg-base-100 p-4 text-xs text-white sm:text-sm md:text-base hover:border-gray-500 transition-all ease-in-out duration-300"
                >
                  {genresTranslate[genre.name] || genre.name}
                  <Icon
                    name={genresIcons[genre.name]}
                    className="size-4 text-gray-400 md:size-6"
                  />
                </Link>
              ))}
            </div>
          </Collapse>
        )}

        {developers.length > 0 && (
          <Collapse
            title="Desarrolladores"
            isOpen={true}
            detailsClassName="text-lg md:text-xl"
          >
            <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
              {gameDetail.involved_companies.map(
                (company) =>
                  company.developer && (
                    <span
                      key={company.company.id}
                      className="text-pretty rounded-md border border-gray-700 bg-base-100 p-4 text-xs text-white sm:text-sm md:text-base line-clamp-2"
                    >
                      {company.company.name}
                    </span>
                  )
              )}
            </div>
          </Collapse>
        )}

        {publishers.length > 0 && (
          <Collapse
            title="Editores"
            isOpen={false}
            detailsClassName="text-lg md:text-xl"
          >
            <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
              {gameDetail.involved_companies.map(
                (company) =>
                  !company.developer && (
                    <span
                      key={company.company.id}
                      className="text-pretty rounded-md border border-gray-700 bg-base-100 p-4 text-xs text-white sm:text-sm md:text-base line-clamp-2"
                    >
                      {company.company.name}
                    </span>
                  ),
              )}
            </div>
          </Collapse>
        )}

        {gameDetail.release_dates && gameDetail?.release_dates.length > 0 && (
          <Collapse
            title="Lanzamientos"
            isOpen={false}
            detailsClassName="text-lg md:text-xl"
          >
            <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
              {gameDetail.release_dates.map((date) => (
                <div
                  key={date.id}
                  className="flex h-20 w-full flex-col justify-between self-center rounded-md border border-gray-700 bg-base-100 p-4"
                >
                  <span className="text-pretty text-xs text-white sm:text-sm md:text-base">
                    {date.date
                      ? DateTime.fromMillis(date.date * 1000).toLocaleString(
                          DateTime.DATE_MED,
                        )
                      : "S/D"}
                  </span>
                  <span className="line-clamp-1 text-xs text-gray-400">
                    {date.platform.name}
                  </span>
                </div>
              ))}
            </div>
          </Collapse>
        )}
      </div>
    </section>
  );
};
