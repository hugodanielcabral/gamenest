const NO_IMAGE_URL = "https://placehold.co/264x352?text=No+Image+Available";

const getImageUrl = (image = NO_IMAGE_URL, resolution = "cover_big") => {
  return image.replace("thumb", resolution);
};

export default getImageUrl;
