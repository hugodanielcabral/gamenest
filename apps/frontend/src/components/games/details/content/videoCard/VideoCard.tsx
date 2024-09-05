import clsx from "clsx";

interface VideoCardProps {
  video: {
    id: number;
    video_id: string;
  };
  handleOnCurrentVideo: (videoId: string) => void;
  currentVideo: string;
}

export const VideoCard = ({ video, handleOnCurrentVideo,currentVideo }: VideoCardProps) => {
  return (
    <img
      key={video.id}
      src={`https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`}
      alt={`Thumbnail del video ${video.video_id}`}
      className={clsx("h-18 w-32 cursor-pointer grayscale border border-gray-500", {
        "grayscale-0": currentVideo === video.video_id,
      })}
      onClick={() => handleOnCurrentVideo(video.video_id)}
    />
  );
};
