import { useEffect, useState } from "react";
import { VideoCard } from "../videoCard/VideoCard";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

interface VideoContentProps {
  videos: { id: number; video_id: string }[];
}

export const VideoContent = ({ videos }: VideoContentProps) => {
  const [currentVideo, setCurrentVideo] = useState("");

  useEffect(() => {
    if (!videos || videos.length === 0) {
      return;
    }
    setCurrentVideo(videos[0].video_id);
  }, []);

  const handleOnCurrentVideo = (videoId: string) => {
    setCurrentVideo(videoId);
  };
  return (
    <>
      <div className="aspect-auto">
        <Plyr
          source={{
            type: "video",
            sources: [
              {
                src:
                  `https://www.youtube.com/watch?v=${currentVideo}` ||
                  "https://www.youtube.com/watch?v=0",
                provider: "youtube",
              },
            ],
          }}
        />
      </div>
      <div className="mt-4 flex space-x-2 overflow-auto">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            handleOnCurrentVideo={handleOnCurrentVideo}
            currentVideo={currentVideo}
          />
        ))}
      </div>
    </>
  );
};
