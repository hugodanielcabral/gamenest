import { AnticipatedGames } from "./anticipated/AnticipatedGames";
import { LatestGames } from "./latest/LatestGames";
import { UpComingGames } from "./upcoming/UpComingGames";

export const HomeReleasedGames = () => {
  return (
    <article className="grid gap-4 sm:grid-cols-3 p-4">
      <section>
        <h1 className="text-center text-sm uppercase tracking-wider text-white underline decoration-yellow-500 decoration-4 underline-offset-4 sm:text-sm md:text-lg lg:text-xl xl:text-xl">
          Últimos lanzamientos
        </h1>
        <LatestGames />
      </section>
      <section>
        <h1 className="text-center text-sm uppercase tracking-wider text-white underline decoration-green-500 decoration-4 underline-offset-4 sm:text-sm md:text-lg lg:text-xl xl:text-xl">
          Próximamente
        </h1>
        <UpComingGames />
      </section>
      <section>
        <h1 className="text-center text-sm uppercase tracking-wider text-white underline decoration-red-500 decoration-4 underline-offset-4 sm:text-sm md:text-lg lg:text-xl xl:text-xl">
          Más anticipados
        </h1>
        <AnticipatedGames />
      </section>
    </article>
  );
};
