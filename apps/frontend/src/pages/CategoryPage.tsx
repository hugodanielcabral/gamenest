import { Container } from "../components/ui/container/Container";
import { Layout } from "../components/layout/Layout";
import { CategoryContent } from "../components/category/content/CategoryContent.tsx";
import { useDataFetch } from "../hooks/useDataFetch.ts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryParams } from "../hooks/useQueryParams.ts";
import { Loading } from "../components/ui/loading/Loading.tsx";
import { Button } from "../components/ui/button/Button.tsx";
import clsx from "clsx";
import { Icon } from "../components/ui/icon/Icon.tsx";
import { genres } from "../data/genres.ts";
import { capitalizeWord } from "../utils/capitalizeWord.ts";
import { Pagination } from "../components/ui/pagination/Pagination.tsx";

interface CategoryPageProps {
  fetchData: {
    games: {
      id: number;
      name: string;
      cover: {
        id: number;
        url: string;
      };
      hypes: number;
      rating: number;
      release_dates: {
        id: number;
        human: string;
      }[];
      slug: string;
      platforms: {
        id: number;
        abbreviation: string;
        name: string;
      }[];
      first_release_date: number;
    }[];
    totalPages: number;
    category: number | string;
  };
}

export const CategoryPage = () => {
  const { path } = useParams();
  const { pathname } = useLocation();
  const { getQueryString } = useQueryParams();
  const navigate = useNavigate();

  const basePath = pathname.replace(`/${path}`, "").replace("/", "");
  const { fetchData, isLoading } = useDataFetch<CategoryPageProps["fetchData"]>(
    `category/${basePath}/${path}`,
    `${getQueryString()}`,
  );

  const handleAdvancedSearch = () => {
    if (!fetchData.category) return;

    navigate(`/games?${basePath}s=${fetchData?.category}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loading color="info" type="dots" />
      </div>
    );
  }

  return (
    <Layout>
      <Container
        className={clsx(
          "flex flex-col space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12",
        )}
      >
        <div
          className={clsx(
            "h-10 w-full bg-gradient-to-b from-gray-700 from-5% to-gray-800 to-95% opacity-90 sm:h-12 md:h-16 lg:h-20",
            {
              "from-rose-700": path === "nintendo",
              "from-green-700": path === "xbox",
              "from-blue-700": path === "playstation",
              "from-accent": path === "pc",
            },
          )}
        ></div>
        <section className="flex flex-col items-center justify-around gap-2 sm:flex-row">
          <h1 className="text-xl text-white md:text-2xl lg:text-3xl xl:text-4xl">
            Juegos de{" "}
            {genres.find((g) => g.slug === path)?.es_name ??
              capitalizeWord(path)}
          </h1>
          <Button
            className={clsx("btn-outline btn-info", {
              "btn-error": path === "nintendo",
              "btn-success": path === "xbox",
              "btn-info": path === "playstation",
              "btn-accent": path === "pc",
            })}
            onClick={handleAdvancedSearch}
          >
            <Icon name="icon-[material-symbols--search]" />
            Búsqueda avanzada
          </Button>
        </section>
        <CategoryContent games={fetchData?.games} />
        <section className="flex justify-center">
          <Pagination totalPages={fetchData?.totalPages} />
        </section>
      </Container>
    </Layout>
  );
};
