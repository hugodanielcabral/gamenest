import propTypes from "prop-types";
export const MediaGalleryScreenshoots = ({
  screenshots,
  handleOpenModal,
  handleTypeOfMedia,
  setStartIndex,
}) => {
  const totalScreenshots = screenshots.length;

  return (
    <>
      {totalScreenshots > 0 ? (
        screenshots?.map((screenshot, index) => {
          return (
            <img
              key={screenshot.id}
              src={screenshot.url.replace("t_thumb", "t_cover_big")}
              className="col-span-2 md:col-span-1 hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer hover:grayscale h-28 md:h-32 lg:h-52 w-full object-cover"
              loading="lazy"
              onClick={() => {
                handleOpenModal();
                handleTypeOfMedia("screenshots");
                setStartIndex(index);
              }}
              alt={`Screenshot ${screenshot.id}`}
            />
          );
        })
      ) : (
        <p className="col-span-4 text-center text-3xl">
          No screenshots available.
        </p>
      )}
    </>
  );
};

MediaGalleryScreenshoots.propTypes = {
  screenshots: propTypes.array.isRequired,
  handleOpenModal: propTypes.func.isRequired,
  handleTypeOfMedia: propTypes.func.isRequired,
  setStartIndex: propTypes.func.isRequired,
};
