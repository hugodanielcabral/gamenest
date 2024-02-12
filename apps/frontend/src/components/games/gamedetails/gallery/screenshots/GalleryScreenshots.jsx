import propTypes from "prop-types";
import { useEffect } from "react";

export const GalleryScreenshots = ({
  screenshots,
  handleModal,
  name,
  handleScreens,
}) => {
  useEffect(() => {
    if (!screenshots) return;
    handleScreens(screenshots, false);
  }, []);

  return (
    <div className="p-3 bg-base-200">
      <h2 className="text-2xl font-bold">Screenshots</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
        {screenshots
          ? screenshots.map((screenshot, index) => (
              <img
                key={screenshot.id}
                src={screenshot.url.replace("t_thumb", "t_cover_big")}
                className="object-cover w-full h-full transition-all duration-200 ease-in-out transform border-transparent rounded-md cursor-pointer hover:border-accent hover:border hover:scale-105"
                alt={`Screenshot ${index} of the game ${name}`}
                onClick={() => handleModal(index, false)}
              />
            ))
          : "No screenshots available"}
      </div>
    </div>
  );
};

GalleryScreenshots.propTypes = {
  screenshots: propTypes.array.isRequired,
  handleModal: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  handleScreens: propTypes.func.isRequired,
};
