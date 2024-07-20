import propTypes from "prop-types";
import { useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { MediaGalleryAdditionalInfo } from "./additionalinfo/MediaGalleryAdditionalInfo";
import { tabsGameDetailsMediaData } from "../../../../constants/gamedetails/websiteicons";
import { MediaGalleryScreenshots } from "./screenshots/MediaGalleryScreenshots";
import { MediaGalleryArtworks } from "./artworks/MediaGalleryArtworks";
import { MediaGalleryVideos } from "./videos/MediaGalleryVideos.tsx";
import { GameDetailsContent } from "./content/GameDetailsContent.tsx";

export const GameDetailsMediaGallery = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Información");

  return (
    <>
      <div className="col-span-4 my-2">
        <div
          role="tablist"
          className="tabs tabs-bordered flex flex-wrap items-center justify-center gap-4 *:w-[150px] md:w-auto"
        >
          {tabsGameDetailsMediaData.map((tab) => (
            <a
              key={tab.id}
              role="tab"
              onClick={() => setActiveTab(tab.name)}
              className={`tab flex-grow ${
                tab.name === activeTab
                  ? "tab-active font-bold text-white"
                  : "text-gray-300"
              } uppercase tracking-wider transition-all duration-200 ease-in-out hover:text-white hover:text-opacity-70`}
            >
              <span className={tab.icon} />
              <span className={tab.textClassName}>{tab.name}</span>
            </a>
          ))}
        </div>
      </div>

      {activeTab === "Información" && (
        <>
          {data?.dlcs?.length > 0 || data?.bundles?.length > 0 ? (
            <GameDetailsContent data={data} />
          ) : null}
          <MediaGalleryAdditionalInfo data={data} />
        </>
      )}
      {activeTab === "Media" && (
        <>
          <MediaGalleryScreenshots screenshotData={data?.screenshots} />
          <MediaGalleryArtworks artworkData={data?.artworks} />
          <MediaGalleryVideos videoData={data?.videos} />
        </>
      )}
    </>
  );
};

GameDetailsMediaGallery.propTypes = {
  data: propTypes.object.isRequired,
  activeTab: propTypes.number.isRequired,
};

GameDetailsMediaGallery.defaultProps = {
  data: {},
  activeTab: 1,
};
