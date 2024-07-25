import { AnticipatedGames } from "./anticipated/AnticipatedGames";
import { LatestGames } from "./latest/LatestGames";
import { UpComingGames } from "./upcoming/UpComingGames";

export const HomeReleasedGames = () => {
  return (
    <article className="grid gap-4 sm:grid-cols-3 p-4 *:flex *:flex-col">
      <section>
        <h3 className="text-center text-xs uppercase tracking-wider text-white underline decoration-yellow-500 decoration-4 underline-offset-8 md:text-base lg:text-xl xl:text-xl">
          Últimos lanzamientos
        </h3>
        <LatestGames />
      </section>
      <section>
        <h3 className="text-center text-xs uppercase tracking-wider text-white underline decoration-green-500 decoration-4 underline-offset-8 md:text-base lg:text-xl xl:text-xl">
          Próximamente
        </h3>
        <UpComingGames />
      </section>
      <section>
        <h3 className="text-center text-xs uppercase tracking-wider text-white underline decoration-red-500 decoration-4 underline-offset-8 md:text-base lg:text-xl xl:text-xl">
          Más anticipados
        </h3>
        <AnticipatedGames />
      </section>
    </article>
  );
};
