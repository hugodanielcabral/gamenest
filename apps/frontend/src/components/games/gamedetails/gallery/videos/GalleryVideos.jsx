import propTypes from "prop-types";
import ReactPlayer from "react-player";
export const GalleryVideos = ({ videos }) => {
  return (
    <div className="p-3 bg-base-200">
      <h2 className="text-2xl font-bold">Videos</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
        {videos
          ? videos.map((video) => (
              <div key={video.id} className="h-40">
                <ReactPlayer
                  url={`https://www.youtube.com/embed/${video.video_id}`}
                  light={true}
                  width={"100%"}
                  height={"100%"}
                  controls={true}
                  muted={true}
                />
              </div>
            ))
          : "No videos available"}
      </div>
    </div>
  );
};

GalleryVideos.propTypes = {
  videos: propTypes.array.isRequired,
};
