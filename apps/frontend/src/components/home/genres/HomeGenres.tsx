import { Link } from "react-router-dom";
import { Carousel, CarouselItem } from "../../ui/carousel/Carousel.tsx";
import { Icon } from "../../ui/icon/Icon.tsx";
import { genres } from "../../../data/genres.ts";

export const HomeGenres = () => {
  return (
    <div className="w-full">
      <Carousel>
        {genres.map((genre) => (
          <CarouselItem key={genre.id}>
            <Link
              className="group flex h-24 w-32 flex-col items-center justify-center rounded-lg bg-gray-800 p-4 shadow-lg shadow-black transition-all duration-300 ease-in-out hover:bg-gray-800/70 md:h-28 md:w-40 lg:h-32 lg:w-56"
              to={`/genres/${genre.slug}`}
            >
              <Icon
                name={genre.icon}
                className="size-6 text-white transition-all duration-300 ease-in-out group-hover:text-blue-400 md:size-8 lg:size-10"
              />
              <h3 className="line-clamp-1 font-nunito text-xs transition-all duration-300 ease-in-out group-hover:text-blue-400 md:text-base lg:text-lg">
                {genre.es_name}
              </h3>
            </Link>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
};
