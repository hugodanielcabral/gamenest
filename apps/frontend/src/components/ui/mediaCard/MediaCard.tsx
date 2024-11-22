import { useRef } from "react";
import { Link } from "react-router-dom";

interface MediaCardProps {
  imageSrc: string;
  imageAlt: string;
  videoSrc: string;
  videoType?: string;
  linkTo: string;
}

export const MediaCard = ({
  imageSrc,
  imageAlt,
  videoSrc,
  videoType = "video/mp4",
  linkTo = "#",
}: MediaCardProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleOnMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleOnMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      className="group relative flex h-44 w-full items-center justify-center overflow-hidden rounded-lg bg-base-100 shadow-lg shadow-black hover:border-2 hover:border-gray-500"
      to={linkTo}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <img className="absolute z-10 w-40" src={imageSrc} alt={imageAlt} />
      {videoSrc && (
        <video
          className="absolute left-0 top-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-70"
          ref={videoRef}
          playsInline
          autoPlay
          loop
          muted
        >
          <source src={videoSrc} type={videoType} />
        </video>
      )}
    </Link>
  );
};
