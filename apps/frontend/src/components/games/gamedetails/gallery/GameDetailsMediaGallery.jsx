import propTypes from "prop-types";
import { MediaGalleryScreenshoots } from "./screenshots/MediaGalleryScreenshoots";
import { MediaGalleryVideos } from "./videos/MediaGalleryVideos";
("react");

export const GameDetailsMediaGallery = ({ data, activeTab }) => {
  return (
    <>
      {activeTab === 1 &&
        data?.screenshots.map((screenshot) => (
          <MediaGalleryScreenshoots
            key={screenshot.id}
            screenshot={screenshot}
            name={data?.name}
          />
        ))}
      {activeTab === 2 &&
        data.videos.map((video) => (
          <MediaGalleryVideos key={video.id} video={video} />
        ))}
    </>
  );
};

GameDetailsMediaGallery.propTypes = {
  data: propTypes.object.isRequired,
  activeTab: propTypes.number.isRequired,
};
