import { useFetch } from "../../../../hooks/useFetch";
import { Loading } from "../../../ui/loading/Loading";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaStar, FaFire } from "react-icons/fa";
import { Card, CardContent, CardImage } from "../../../ui/card/Card";
import getImageUrl from "../../../../utils/getImageUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface PopularGame {
  id: number;
  name: string;
  slug: string;
  cover: {
    url: string;
  };
  rating: number;
}

export const HomePopularGames = () => {
  const { data: popularGamesData, isLoading } = useFetch(
    `${BASE_URL}/popular/games`,
  );

  return (
    <section className="flex flex-col justify-center items-center gap-6">
      <h2 className="text-3xl text-gray-300">
        Juegos populares <FaFire className="inline text-red-500" />{" "}
      </h2>
      {!isLoading ? (
        <>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={0}
            slidesPerView={3}
            className="max-w-5xl"
            navigation
            pagination={{ clickable: true }}
          >
            {popularGamesData?.map((game: PopularGame) => (
              <SwiperSlide key={game.id} className="px-10">
                <Card>
                  <CardImage
                    imgSrc={() => getImageUrl(game.cover.url, "cover_big_2x")}
                    title={game.name}
                  />
                  <CardContent title={game.name}>
                    <p className="absolute left-2 right-2 top-28 z-10 flex flex-col items-center gap-1 text-lg text-gray-300">
                      <FaStar className="text-yellow-400" />
                      {Math.floor(game.rating)} / 100
                    </p>
                    <Link to={`/games/${game.slug}`}>
                      <FaExternalLinkAlt className="absolute right-2 top-2 z-10 size-6 text-gray-300 opacity-0 transition-colors duration-300 ease-in-out hover:text-info group-hover:opacity-100" />
                    </Link>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <div className="mt-10">
          <Loading />
        </div>
      )}
    </section>
  );
};
