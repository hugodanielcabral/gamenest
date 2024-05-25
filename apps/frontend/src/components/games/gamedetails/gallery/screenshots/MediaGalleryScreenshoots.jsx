import propTypes from "prop-types";
export const MediaGalleryScreenshoots = ({
  screenshots,
  handleOpenModal,
  handleTypeOfMedia,
  setStartIndex,
}) => {
  if (!screenshots)
    return (
      <p className="col-span-4 text-center text-lg md:text-2xl text-white">
        No hay screenshots disponibles.
      </p>
    );

  return (
    <>
      {screenshots?.map((screenshot, index) => {
        return (
          <img
            key={screenshot.id}
            src={screenshot.url.replace("t_thumb", "t_cover_big")}
            className="col-span-2 sm:col-span-1 md:col-span-1 hover:scale-95 transform transition duration-200 ease-in-out cursor-pointer hover:saturate-50 h-28 md:h-32 lg:h-52 w-full object-cover"
            loading="lazy"
            onClick={() => {
              handleOpenModal();
              handleTypeOfMedia("screenshots");
              setStartIndex(index);
            }}
            alt={`Screenshot ${screenshot.id}`}
          />
        );
      })}
    </>
  );
};

MediaGalleryScreenshoots.propTypes = {
  screenshots: propTypes.array.isRequired,
  handleOpenModal: propTypes.func.isRequired,
  handleTypeOfMedia: propTypes.func.isRequired,
  setStartIndex: propTypes.func.isRequired,
};

MediaGalleryScreenshoots.defaultProps = {
  screenshots: [],
};
