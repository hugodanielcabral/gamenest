import propTypes from "prop-types";
import { AdditionalInfoWebsites } from "./websites/AdditionalInfoWebsites.jsx";
/* import { AdditionalInfoStoryline } from "./storyline/AdditionalInfoStoryline.jsx";
 */
import { AdditionalInfoAgeRating } from "./ageRating/AdditionalInfoAgeRating.jsx";
import { AdditionalInfoSimilarGames } from "./similarGames/AdditionalInfoSimilarGames";

export const MediaGalleryAdditionalInfo = ({ data }) => {
  const { websites, similar_games, name: currentGameName } = data;

  return (
    <div className="col-span-4 grid grid-cols-3 gap-4">
      {/* <AdditionalInfoStoryline data={data} /> */}
      <div className="col-span-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <AdditionalInfoWebsites websiteData={websites} />
        <AdditionalInfoAgeRating data={data} />
      </div>
      <AdditionalInfoSimilarGames
        similarGamesData={similar_games}
        currentGameName={currentGameName}
      />
    </div>
  );
};

MediaGalleryAdditionalInfo.propTypes = {
  data: propTypes.object,
};

MediaGalleryAdditionalInfo.defaultProps = {
  data: {},
};
