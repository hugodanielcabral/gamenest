import propTypes from "prop-types";
export const MediaGalleryScreenshoots = ({ screenshot, name }) => {
  return (
    <>
      <img
        key={screenshot.id}
        src={screenshot.url.replace("t_thumb", "t_720p")}
        className="col-span-2 md:col-span-1 hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer hover:saturate-200"
        loading="lazy"
        alt={`Screenshot of the game ${name}`}
      />
    </>
  );
};

MediaGalleryScreenshoots.propTypes = {
  screenshot: propTypes.object.isRequired,
  name: propTypes.string.isRequired,
};
