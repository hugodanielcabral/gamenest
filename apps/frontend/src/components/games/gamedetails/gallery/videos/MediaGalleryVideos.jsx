import propTypes from "prop-types";
import ReactPlayer from "react-player";
export const MediaGalleryVideos = ({ video }) => {
  return (
    <>
      <div
        key={video.id}
        className="col-span-4 md:col-span-1 max-h-60 h-48 hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer hover:saturate-200"
      >
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${video.video_id}`}
          light={true}
          width={"100%"}
          height={"100%"}
          controls={true}
          muted={true}
        />
      </div>
    </>
  );
};

MediaGalleryVideos.propTypes = {
  video: propTypes.object.isRequired,
};
