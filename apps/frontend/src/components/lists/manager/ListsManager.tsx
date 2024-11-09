import type { FormState } from "../../../types/listsManager.ts";
import { useForm } from "../../../hooks/useForm.ts";
import { POST } from "../../../services/apiServices.ts";
import { Layout } from "../../layout/Layout";
import { Container } from "../../ui/container/Container";
import { Option, Select } from "../../ui/select/Select.tsx";
import { ManagerGamesSearch } from "./gamesSearch/ManagerGamesSearch.tsx";
import { Input } from "../../ui/input/Input.tsx";
import { Button } from "../../ui/button/Button.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { Icon } from "../../ui/icon/Icon.tsx";
import clsx from "clsx";

const Errors = ({ serverErrors }: { serverErrors: ServerErrors[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {serverErrors.map((error) => (
        <small key={error.path} className="text-red-500 flex items-center gap-1">
          <Icon name="icon-[material-symbols--error]" />
          {error.msg}
        </small>
      ))}
    </div>
  );
};

const VISIBILITY_OPTIONS = [
  {
    id: 1,
    title: "Pública",
    value: true,
  },
  {
    id: 2,
    title: "Privada",
    value: false,
  },
];

const INITIAL_FORM_STATE: FormState = {
  title: "",
  description: "",
  visibility: false,
  games: [],
};

export enum SendingState {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

interface ServerErrors {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export const ListsManager = () => {
  const { formState, handleOnChange, setFormState } =
    useForm<FormState>(INITIAL_FORM_STATE);
  const [sendingState, setSendingState] = useState(SendingState.Idle);
  const [serverErrors, setServerErrors] = useState<ServerErrors[]>(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendingState(SendingState.Loading);
    try {
      const newCollection = await POST(`/lists`, {
        title: formState.title,
        description: formState.description,
        visibility: Boolean(formState.visibility),
        games: formState.games,
      });

      if (!newCollection.ok) {
        const { errors } = await newCollection.json();
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

  const getSendingState = () => {
    switch (sendingState) {
      case SendingState.Idle:
        return "Enviar";
      case SendingState.Loading:
        return "Enviando...";
      case SendingState.Success:
        return "Enviado";
      case SendingState.Error:
        return "Error";
    }
  };

  return (
    <Layout>
      <Container className="flex flex-col space-y-8 p-4">
        <Toaster position="top-center" duration={2000} visibleToasts={1} />
        <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-8">
          <h2 className="text-xl text-gray-300 sm:text-2xl md:text-3xl lg:text-4xl">
            Nueva lista
          </h2>
          <section className="flex flex-col gap-4 *:flex-grow md:flex-row">
            <div className="flex flex-col gap-4">
              <Input
                name="title"
                value={formState.title}
                onChange={handleOnChange}
                placeholder="Título"
                className={clsx("max-w-full", {
                  "border-red-500": serverErrors?.some((error) => {
                    return error.path === "title";
                  }),
                  "border-green-500": sendingState === SendingState.Success,
                })}
              />
              <Select
                name="visibility"
                id="visibility"
                onChange={handleOnChange}
              >
                <option value="" disabled>
                  Visibilidad
                </option>
                {VISIBILITY_OPTIONS.map((visibility) => (
                  <Option
                    key={visibility.id}
                    text={visibility.title}
                    value={visibility.value.toString()}
                  />
                ))}
              </Select>
            </div>
            <textarea
              className={clsx("textarea textarea-bordered", {
                "border-red-500": serverErrors?.some((error) => {
                  return error.path === "description";
                }),
                "border-green-500":
                  sendingState === SendingState.Success &&
                  !serverErrors &&
                  formState.description,
              })}
              placeholder="Descripción (opcional)"
              name="description"
              id="description"
              value={formState.description}
              onChange={handleOnChange}
            ></textarea>
          </section>

          {serverErrors && <Errors serverErrors={serverErrors} />}

          <Button
            type="submit"
            variant="info"
            disabled={
              sendingState === SendingState.Loading ||
              !formState.title ||
              sendingState === SendingState.Success
            }
          >
            {getSendingState()}
          </Button>
        </form>

        <ManagerGamesSearch formState={formState} setFormState={setFormState} sendingState={
          sendingState
        } />
      </Container>
    </Layout>
  );
};
