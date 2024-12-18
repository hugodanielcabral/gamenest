import { useState } from "react";
import { useForm } from "../../../../hooks/useForm.ts";
import { POST } from "../../../../services/apiServices.ts";
import { DetailsCard } from "../../details/card/DetailsCard.tsx";
import {
  FormState,
  GamesProps,
  SendingState,
} from "../../../../types/listsManager.ts";
import { Input } from "../../../ui/input/Input.tsx";
import { Select } from "../../../ui/select/Select.tsx";
import clsx from "clsx";
import { Icon } from "../../../ui/icon/Icon.tsx";
import { Button } from "../../../ui/button/Button.tsx";

const INITIAL_SEARCH_STATE = {
  search: "",
};

enum FetchState {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

interface ManagerGamesSearchProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  sendingState: SendingState;
  handleGameRemove: (gameId: string) => void;
}

export const ManagerGamesSearch = ({
  formState,
  setFormState,
  sendingState,
  handleGameRemove,
}: ManagerGamesSearchProps) => {
  const { formState: searchState, handleOnChange } =
    useForm(INITIAL_SEARCH_STATE);
  const [gamesData, setGamesData] = useState<GamesProps["fetchData"]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchState, setFetchState] = useState<FetchState>(FetchState.Idle);
  const [errors, setErrors] = useState<string | null>(null);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchState.search.trim()) return;
    setIsLoading(true);
    setFetchState(FetchState.Loading);
    const response = await POST("/search/games", {
      search: searchState.search,
    });

    if (!response.ok) {
      console.error("Ocurrió un error al buscar los juegos");
      setIsLoading(false);
      setFetchState(FetchState.Error);
      return;
    }

    const data = await response.json();
    setGamesData(data);
    setIsLoading(false);
    setFetchState(FetchState.Success);
  };

  const handleGameSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const selectedGame = gamesData.find((game) => game.name === value);

    if (!selectedGame) return;

    const isGameAlreadyAdded = formState.games.some((game) => {
      return game.slug === selectedGame.slug;
    });

    if (isGameAlreadyAdded) {
      setErrors(`El juego ${selectedGame.name} ya está en tu lista`);
      return;
    }

    setFormState((prevState) => ({
      ...prevState,
      games: [...prevState.games, selectedGame],
    }));
    setErrors(null);
  };

  const getFetchStateMessage = () => {
    const messages = {
      [FetchState.Loading]: "Cargando...",
      [FetchState.Success]: "Selecciona un juego",
      [FetchState.Error]: "Ocurrió un error al buscar los juegos",
      [FetchState.Idle]: "Esperando búsqueda",
    };

    return messages[fetchState] || "Esperando búsqueda";
  };

  return (
    <form onSubmit={handleSearchSubmit} className="space-y-10 p-4">
      <div className="mx-auto flex max-w-xl flex-col justify-center gap-4 md:flex-row">
        <Input
          name="search"
          value={searchState.search}
          onChange={handleOnChange}
          placeholder="Buscar juegos"
          disabled={isLoading}
          autoComplete="off"
          className={clsx("max-w-full", {
            "opacity-50": isLoading,
            "border-red-500": errors,
            "border-gray-700": gamesData.length === 0 && !errors,
          })}
        />
        <Select
          name="games"
          onChange={handleGameSelect}
          disabled={
            isLoading || gamesData.length === 0 || formState.games.length >= 50
          }
          className={clsx("", {
            "opacity-50": isLoading,
            "border-red-500": errors,
            "border-gray-700": gamesData.length === 0 && !errors,
          })}
          defaultValue=""
        >
          <option value="">{getFetchStateMessage()}</option>
          {gamesData.map((game) => (
            <option key={game.id} value={game.name}>
              {game?.name}
            </option>
          ))}
        </Select>
        <Button
          type="submit"
          className="btn-outline btn-info btn-sm mx-auto md:btn-md"
          disabled={isLoading || !searchState.search.length}
        >
          Buscar
        </Button>
      </div>

      <small
        className={clsx("flex justify-center", {
          "text-red-500": formState.games.length >= 50,
          "text-gray-400": formState.games.length < 50,
        })}
      >
        Total de juegos: {formState.games.length} / 50
      </small>

      {errors && (
        <p className="text-center font-nunito text-sm text-red-500">{errors}</p>
      )}

      {formState.games.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-4 lg:grid-cols-6">
          {formState.games.map((game) => (
            <div className="relative" key={game.id}>
              <DetailsCard
                game={{
                  game_id: game.id,
                  game_name: game.name,
                  game_cover: game.cover.url,
                  game_slug: game.slug,
                }}
              />
              <button
                type="button"
                className={clsx(
                  "group absolute right-1 top-1 rounded-lg bg-gray-700/70 p-2 hover:bg-gray-700/90",
                  {
                    hidden:
                      sendingState === SendingState.Loading ||
                      sendingState === SendingState.Success,
                  },
                )}
                onClick={() => handleGameRemove(game.id)}
              >
                <Icon
                  name="icon-[material-symbols--delete]"
                  className="group-hover:text-yellow-error/90 size-4 text-red-500 sm:size-5 md:size-6 lg:size-8"
                />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h3 className="font-nunito text-xl font-bold text-blue-400 md:text-2xl lg:text-3xl">
            Tu lista está vacía
          </h3>
          <p className="font-nunito text-xs text-gray-400 sm:text-sm md:text-lg">
            Agrega juegos usando el buscador de arriba.
          </p>
        </div>
      )}
    </form>
  );
};
