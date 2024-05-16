const NO_IMAGE_URL = "https://placehold.co/264x352?text=No+Image+Available";

const getImageUrl = (
  image = NO_IMAGE_URL,
  resolution = "cover_big",
  thumbnailType = "thumb"
) => {
  return image.replace(thumbnailType, resolution);
};

export default getImageUrl;
