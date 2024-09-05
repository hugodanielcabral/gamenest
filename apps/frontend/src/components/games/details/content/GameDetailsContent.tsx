import type { GameDetailsContentProps } from "../../../../types/gameDetails";
import { ContentDescription } from "./description/ContentDescription";
import { Collapse } from "../../../ui/collapse/Collapse";
import { DateTime } from "luxon";
import { genresIcons, genresTranslate } from "../../../../data/genresData";
import { Icon } from "../../../ui/icon/Icon";
import { DLCs } from "./dlcs/DLCs";
import { VideoContent } from "./videoContent/VideoContent";

export const GameDetailsContent = ({ gameDetail }: GameDetailsContentProps) => {
  return (
    <section className="grid grid-cols-1 gap-8 p-4 md:grid-cols-3">
      <div className="col-span-2 space-y-4">
        {gameDetail.videos && gameDetail.videos.length && (
          <VideoContent videos={gameDetail.videos} />
        )}
        <ContentDescription
          summary={gameDetail.summary}
          storyline={gameDetail.storyline}
        />
      </div>

      <div className="space-y-4">
        {gameDetail?.genres && gameDetail?.genres.length > 0 && (
          <Collapse
            title="Géneros"
            isOpen={true}
            detailsClassName="text-lg md:text-xl"
          >
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {gameDetail.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="item-center flex justify-between text-pretty rounded-md border border-gray-700 bg-base-100 p-4 text-sm text-white"
                >
                  {genresTranslate[genre.name] || genre.name}
                  <Icon
                    name={genresIcons[genre.name]}
                    className="size-4 text-gray-400 md:size-6"
                  />
                </span>
              ))}
            </div>
          </Collapse>
        )}

        {gameDetail.involved_companies &&
          gameDetail?.involved_companies.length > 0 && (
            <Collapse
              title="Desarrolladores"
              isOpen={true}
              detailsClassName="text-lg md:text-xl"
            >
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {gameDetail.involved_companies.map(
                  (company) =>
                    company.developer && (
                      <span
                        key={company.company.id}
                        className="text-pretty rounded-md border border-gray-700 bg-base-100 p-4 text-sm text-white"
                      >
                        {company.company.name}
                      </span>
                    ),
                )}
              </div>
            </Collapse>
          )}

        {gameDetail.involved_companies &&
          gameDetail?.involved_companies.length > 0 && (
            <Collapse
              title="Editores"
              isOpen={false}
              detailsClassName="text-lg md:text-xl"
            >
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {gameDetail.involved_companies.map(
                  (company) =>
                    !company.developer && (
                      <span
                        key={company.company.id}
                        className="text-pretty rounded-md border border-gray-700 bg-base-100 p-4 text-sm text-white"
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
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {gameDetail.release_dates.map((date) => (
                <div
                  key={date.id}
                  className="flex h-28 w-full flex-col justify-between self-center rounded-md border border-gray-700 bg-base-100 p-4"
                >
                  <span className="text-pretty text-sm text-white">
                    {DateTime.fromMillis(date.date * 1000).toLocaleString(
                      DateTime.DATE_FULL,
                    )}
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

      {gameDetail.bundles || gameDetail.dlcs ? (
        <DLCs gameDetail={gameDetail} />
      ) : null}
    </section>
  );
};
