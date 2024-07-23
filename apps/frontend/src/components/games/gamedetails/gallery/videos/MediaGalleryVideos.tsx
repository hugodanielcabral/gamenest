import Plyr from "plyr-react";
import "plyr-react/plyr.css";

interface MediaGalleryVideosProps {
  videoData: {
    id: number;
    video_id: string;
  }[];
}

export const MediaGalleryVideos = ({ videoData }: MediaGalleryVideosProps) => {
  const playerOptions = {
    controls: ["play", "progress", "mute", "volume", "fullscreen"],
  };

  if (!videoData) return null;

  return (
    videoData && (
      <div className="col-span-4 grid grid-cols-1 gap-2 rounded-md border-2 border-gray-700 bg-base-100 bg-opacity-70 shadow-lg shadow-black p-4 sm:grid-cols-2 md:grid-cols-3">
        <h2 className="col-span-full text-xl text-white stroke-slate-100 uppercase tracking-wider">
          Videos ({videoData?.length})
        </h2>
        {videoData.map((video) => (
          <div className="h-full w-full p-2">
            <Plyr
              key={video.id}
              options={playerOptions}
              source={{
                type: "video",
                sources: [{ src: video.video_id, provider: "youtube" }],
              }}
            />
          </div>
        ))}
      </div>
    )
  );
};
