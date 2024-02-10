import propTypes from "prop-types";
import ReactPlayer from "react-player";

export const GameDetailsMedia = ({ game }) => {
  const { videos, screenshots } = game;
  return (
    <div className="col-span-4 row-span-3 border md:col-span-3">
      {game && (
        <div className="grid grid-cols-4 grid-rows-2 gap-3 p-3">
          <div className="col-span-2 row-span-2">
            {videos && (
              <div className="h-full min-h-64">
                <ReactPlayer
                  url={`${`https://www.youtube.com/embed/${videos[0].video_id}`}`}
                  light={true}
                  width={"100%"}
                  height={"100%"}
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
                      src={screenshot.url.replace(
                        "t_thumb",
                        "t_screenshot_med"
                      )}
                      alt={game.name}
                      className="object-cover w-full h-full transition-opacity duration-300 ease-in-out rounded-md cursor-pointer hover:opacity-75"
                      onClick={() => {
                        console.log("clicked"); //! Agregar un modal para ver la imagen en tamaño completo.
                      }}
                    />
                  )
              )}
          </div>
        </div>
      )}
    </div>
  );
};

GameDetailsMedia.propTypes = {
  game: propTypes.object.isRequired,
};
