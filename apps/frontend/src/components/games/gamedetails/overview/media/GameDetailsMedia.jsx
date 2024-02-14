import propTypes from "prop-types";
import ReactPlayer from "react-player";
import { MediaModal } from "./modal/MediaModal";
import { useEffect, useState } from "react";

export const GameDetailsMedia = ({ game }) => {
  const { videos, screenshots } = game;
  const [screen, setScreen] = useState([
    {
      original: "",
    },
  ]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const handleModal = (index) => {
    const modal = document.getElementById("gamedetailsmedia_modal");
    modal.showModal();
    setGalleryIndex(index);
  };

  useEffect(() => {
    if (!screenshots) return;
    const images = screenshots.slice(0, 4).map((screenshot) => {
      return {
        original: screenshot.url.replace("t_thumb", "t_1080p"),
      };
    });

    setScreen(images);
  }, []);

  return (
    <div className="col-span-4 row-span-3 md:col-span-3">
      {game && (
        <div className="grid grid-cols-4 grid-rows-2 gap-3">
          <div className="col-span-2 row-span-2">
            {videos && (
              <div className="h-full min-h-64">
                <ReactPlayer
                  url={`${`https://www.youtube.com/embed/${videos[0].video_id}`}`}
                  light={true}
                  width={"100%"}
                  height={"100%"}
                  controls={true}
                  muted={true}
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 col-span-2 row-span-2 gap-3">
            {screenshots &&
              screenshots.map(
                (screenshot, index) =>
                  index < 4 && (
                    <img
                      key={screenshots[index].id}
                      src={screenshot.url.replace("t_thumb", "t_cover_big")}
                      alt={game.name}
                      className="object-cover w-full h-full transition-all duration-200 ease-in-out transform border-transparent rounded-md cursor-pointer hover:border-accent hover:border hover:scale-105 "
                      onClick={() => handleModal(index)}
                    />
                  )
              )}
          </div>
          <MediaModal screen={screen} galleryIndex={galleryIndex} />
        </div>
      )}
    </div>
  );
};

GameDetailsMedia.propTypes = {
  game: propTypes.object.isRequired,
};
