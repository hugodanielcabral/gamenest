import propTypes from "prop-types";
import { AdditionalInfoWebsites } from "./websites/AdditionalInfoWebsites.jsx";
import { AdditionalInfoStoryline } from "./storyline/AdditionalInfoStoryline.jsx";
import { AdditionalInfoSpecifications } from "./specifications/AdditionalInfoSpecifications.jsx";
import { AdditionalInfoAgeRating } from "./ageRating/AdditionalInfoAgeRating.jsx";

export const MediaGalleryAdditionalInfo = ({ data }) => {
  return (
    <div className="col-span-4 grid grid-cols-3 gap-3">
      <AdditionalInfoStoryline data={data} />
      <AdditionalInfoWebsites data={data} />
      <AdditionalInfoSpecifications data={data} />
      <AdditionalInfoAgeRating data={data} />
    </div>
  );
};

MediaGalleryAdditionalInfo.propTypes = {
  data: propTypes.object,
};

MediaGalleryAdditionalInfo.defaultProps = {
  data: {},
};
