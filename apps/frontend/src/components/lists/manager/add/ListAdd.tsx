import { toast, Toaster } from "sonner";
import { Layout } from "../../../layout/Layout";
import { Container } from "../../../ui/container/Container";
import { ListForm } from "../form/ListForm";
import { useForm } from "../../../../hooks/useForm.ts";
import {
  FormState,
  SendingState,
  ServerErrors,
} from "../../../../types/listsManager.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListRepository } from "../../../repositories/ListRepository.ts";
import { ManagerGamesSearch } from "../gamesSearch/ManagerGamesSearch.tsx";

const INITIAL_FORM_STATE: FormState = {
  title: "",
  description: "",
  visibility: "",
  games: [],
};


export const ListAdd = () => {
  const { formState, handleOnChange, setFormState } =
  useForm<FormState>(INITIAL_FORM_STATE);
  const [sendingState, setSendingState] = useState<SendingState>(
    SendingState.Idle,
  );
  const [serverErrors, setServerErrors] = useState<ServerErrors[]>(null);
  const navigate = useNavigate();
  
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendingState(SendingState.Loading);
    try {
      const newList = await ListRepository.create(formState);

      if (!newList.ok) {
        const { errors } = await newList.json();
        setServerErrors(errors);
        setSendingState(SendingState.Error);
        return toast.error(
          "Ocurrió un error al crear la lista, por favor intenta de nuevo",
          {
            duration: 3000,
            className:
              "bg-error text-white text-xs md:text-sm text-white font-nunito",
          },
        );
      }

      setSendingState(SendingState.Success);
      setServerErrors(null);
      toast.success(`Lista creada con éxito`, {
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
    }));
  };

  return (
    <Layout title="Nueva Lista">
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
