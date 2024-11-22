import pcLogo from "../../../assets/logos/windows-logo.webp";
import xboxLogo from "../../../assets/logos/xbox-logo.webp";
import playstationLogo from "../../../assets/logos/playstation-logo.webp";
import nintendoLogo from "../../../assets/logos/nintendo-logo.webp";
import androidLogo from "../../../assets/logos/android-logo.webp";
import xboxVideo from "../../../assets/videos/xbox.mp4";
import pcVideo from "../../../assets/videos/pc.mp4";
import platstationVideo from "../../../assets/videos/playstation.mp4";
import nintendoVideo from "../../../assets/videos/nintendo.mp4";
import mobileVideo from "../../../assets/videos/mobile.mp4";
import { MediaCard } from "../../ui/mediaCard/MediaCard";

const platforms = [
  {
    id: 1,
    name: "PC",
    imgSrc: pcLogo,
    videoSrc: pcVideo,
    link: "pc"
  },
  {
    id: 2,
    name: "Xbox",
    imgSrc: xboxLogo,
    videoSrc: xboxVideo,
    link: "xbox"
  },
  {
    id: 3,
    name: "PlayStation",
    imgSrc: playstationLogo,
    videoSrc: platstationVideo,
    link: "playstation"
  },
  {
    id: 4,
    name: "Nintendo",
    imgSrc: nintendoLogo,
    videoSrc: nintendoVideo,
    link: "nintendo"
  },
  {
    id: 5,
    name: "Android",
    imgSrc: androidLogo,
    videoSrc: mobileVideo,
    link: "android"
  },
];

export const HomePlatforms = () => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
      {platforms.map((platform) => (
        <MediaCard
          key={platform.id}
          imageSrc={platform.imgSrc}
          imageAlt={`Plataforma ${platform.name}`}
          videoSrc={platform.videoSrc}
          linkTo={`/platforms/${platform.link}`}
        />
      ))}
    </div>
  );
};
