import { useEffect, useState } from "react";
import { VideoCard } from "./videoCard/VideoCard";
import { ContentDescription } from "./description/ContentDescription";
import { Collapse } from "../../../ui/collapse/Collapse";
import { DateTime } from "luxon";
import { genresIcons, genresTranslate } from "../../../../data/genresData";
import { Icon } from "../../../ui/icon/Icon";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import type { GameDetailsContentProps } from "../../../../types/gameDetails";

export const GameDetailsContent = ({ gameDetail }: GameDetailsContentProps) => {
  const [currentVideo, setCurrentVideo] = useState(
    gameDetail?.videos[0].video_id,
  );

  useEffect(() => {
    if (gameDetail?.videos.length === 0) {
      return;
    }
    setCurrentVideo(gameDetail?.videos[0].video_id);
  }, []);

  const handleOnCurrentVideo = (videoId: string) => {
    setCurrentVideo(videoId);
  };

  return (
    <section className="grid grid-cols-1 gap-8 p-4 md:grid-cols-3">
      <div className="col-span-2 space-y-4">
        <div>
          {gameDetail.videos.length > 0 && (
            <div className="aspect-auto">
              <Plyr
                source={{
                  type: "video",
                  sources: [
                    {
                      src:
                        `https://www.youtube.com/watch?v=${currentVideo}` ||
                        "https://www.youtube.com/watch?v=0",
                      provider: "youtube",
                    },
                  ],
                }}
              />
            </div>
          )}
          <div className="mt-4 flex space-x-2 overflow-auto">
            {gameDetail.videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                handleOnCurrentVideo={handleOnCurrentVideo}
                currentVideo={currentVideo}
              />
            ))}
          </div>
        </div>
        <ContentDescription
          summary={gameDetail.summary}
          storyline={gameDetail.storyline}
        />
      </div>
      <div className="space-y-4">
        {/* Generos, Devs, Publishers y Lanzamientos. */}

        <Collapse
          title="Géneros"
          isOpen={true}
          detailsClassName="text-lg md:text-xl"
        >
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {gameDetail.genres.map((genre) => (
              <span
                key={genre.id}
                className="item-center flex justify-between text-pretty rounded-md border border-gray-700 bg-base-100 p-4 text-sm text-white md:text-base"
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
                    className="text-pretty rounded-md border border-gray-700 bg-base-100 p-4 text-sm text-white md:text-base"
                  >
                    {company.company.name}
                  </span>
                ),
            )}
          </div>
        </Collapse>

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
                    className="text-pretty rounded-md border border-gray-700 bg-base-100 p-4 text-sm text-white md:text-base"
                  >
                    {company.company.name}
                  </span>
                ),
            )}
          </div>
        </Collapse>

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
                <span className="text-pretty text-sm text-white md:text-base">
                  {DateTime.fromMillis(date.date * 1000).toLocaleString(
                    DateTime.DATE_FULL,
                  )}
                </span>
                <span className="line-clamp-1 text-xs text-gray-400 md:text-sm">
                  {date.platform.name}
                </span>
              </div>
            ))}
          </div>
        </Collapse>
      </div>
    </section>
  );
};
