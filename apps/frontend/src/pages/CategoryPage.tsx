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
        className={clsx("flex flex-col space-y-6 p-4 md:space-y-12", {
          "from-blue-800 from-10%": path === "playstation",
          "from-green-800 from-10%": path === "xbox",
          "from-amber-800 from-10%": path === "pc",
          "from-rose-800 from-10%": path === "nintendo",
        })}
      >
        <section className="flex flex-col items-center justify-around gap-2 sm:flex-row">
          <h1 className="text-xl text-white md:text-2xl lg:text-3xl xl:text-4xl">
            Juegos de{" "}
            {genres.find((g) => g.slug === path)?.es_name ??
              capitalizeWord(path)}
          </h1>
          <Button variant="info" onClick={handleAdvancedSearch}>
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
