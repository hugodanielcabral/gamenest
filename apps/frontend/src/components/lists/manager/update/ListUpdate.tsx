import { toast, Toaster } from "sonner";
import { Layout } from "../../../layout/Layout";
import { Container } from "../../../ui/container/Container";
import { ListForm } from "../form/ListForm";
import {
  FormState,
  SendingState,
  ServerErrors,
} from "../../../../types/listsManager";
import { useForm } from "../../../../hooks/useForm.ts";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ListRepository } from "../../../repositories/ListRepository.ts";
import { ManagerGamesSearch } from "../gamesSearch/ManagerGamesSearch.tsx";

const INITIAL_FORM_STATE: FormState = {
  title: "",
  description: "",
  visibility: "",
  games: [],
  deletedGameIds: [],
};

const convertGameToState = (game: {
  game_id: number;
  game_name: string;
  list_games_id: number;
  game_cover: string;
  game_slug: string;
}) => ({
  id: game.list_games_id.toString(),
  name: game.game_name,
  game_id: game.game_id.toString(),
  cover: {
    id: game.list_games_id.toString(),
    url: game.game_cover,
  },
  slug: game.game_slug,
});

export const ListUpdate = () => {
  const { formState, handleOnChange, setFormState } =
    useForm<FormState>(INITIAL_FORM_STATE);
  const [sendingState, setSendingState] = useState<SendingState>(
    SendingState.Idle,
  );
  const [serverErrors, setServerErrors] = useState<ServerErrors[]>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      const response = await ListRepository.getListById(id);

      if (!response.ok) {
        return toast.error(
          "Ocurrió un error al obtener la lista, por favor intenta de nuevo",
          {
            duration: 3000,
            className:
              "bg-error text-white text-xs md:text-sm text-white font-nunito",
          },
        );
      }

      const data = await response.json();
      setFormState({
        title: data.list.title,
        description: data.list.description,
        visibility: data.list.visibility,
        games: data.games.map(convertGameToState),
        deletedGameIds: [],
      });
    };

    fetchList();
  }, []);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendingState(SendingState.Loading);
    try {
      const updatedList = await ListRepository.update(formState, id);

      if (!updatedList.ok) {
        const { errors } = await updatedList.json();
        setServerErrors(errors);
        setSendingState(SendingState.Error);
        return toast.error(
          "Ocurrió un error al actualizar la lista, por favor intenta de nuevo",
          {
            duration: 3000,
            className:
              "bg-error text-white text-xs md:text-sm text-white font-nunito",
          },
        );
      }

      setSendingState(SendingState.Success);
      setServerErrors(null);
      toast.success(`Lista actualizada con éxito`, {
        className:
          "bg-success text-white text-xs md:text-sm text-white font-nunito",
      });
      setTimeout(() => {
        navigate("/user/lists");
      }, 2000);
    } catch (error) {
      console.error(error);
      setSendingState(SendingState.Error);
    }
  };

  const handleGameRemove = (gameId: string) => {
    setFormState((prevState) => ({
      ...prevState,
      games: prevState.games.filter((game) => game.id !== gameId),
      deletedGameIds: [...prevState.deletedGameIds, gameId],
    }));
  };

  return (
    <Layout>
      <Toaster position="top-center" duration={2000} visibleToasts={1} />
      <Container className="flex flex-col space-y-8 p-4">
        <ListForm
          handleOnSubmit={handleOnSubmit}
          formState={formState}
          handleOnChange={handleOnChange}
          serverErrors={serverErrors}
          sendingState={sendingState}
        />
        <ManagerGamesSearch
          formState={formState}
          setFormState={setFormState}
          sendingState={sendingState}
          handleGameRemove={handleGameRemove}
        />
      </Container>
    </Layout>
  );
};
