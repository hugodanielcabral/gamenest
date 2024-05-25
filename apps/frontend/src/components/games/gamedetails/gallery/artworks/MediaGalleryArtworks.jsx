import propTypes from "prop-types";

export const MediaGalleryArtworks = ({
  artworks,
  handleOpenModal,
  handleTypeOfMedia,
  setStartIndex,
}) => {
  if (!artworks)
    return (
      <p className="col-span-4 text-center text-lg md:text-2xl text-white">
        No hay artworks disponible.
      </p>
    );

  return (
    <>
      {artworks.map((artwork, index) => {
        return (
          <img
            key={artwork.id}
            src={artwork.url.replace("t_thumb", "t_cover_big")}
            className="col-span-2 sm:col-span-1 md:col-span-1 hover:scale-95 transform transition duration-200 ease-in-out cursor-pointer hover:saturate-50 h-28 md:h-32 lg:h-52 w-full object-cover"
            loading="lazy"
            onClick={() => {
              handleOpenModal();
              handleTypeOfMedia("artworks");
              setStartIndex(index);
            }}
            alt={`Artwork ${artwork.id}`}
          />
        );
      })}
    </>
  );
};

MediaGalleryArtworks.propTypes = {
  artworks: propTypes.array.isRequired,
  handleOpenModal: propTypes.func.isRequired,
  handleTypeOfMedia: propTypes.func.isRequired,
  setStartIndex: propTypes.func.isRequired,
};

MediaGalleryArtworks.defaultProps = {
  artworks: [],
};
