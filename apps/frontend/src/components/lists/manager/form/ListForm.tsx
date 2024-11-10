import clsx from "clsx";
import { Input } from "../../../ui/input/Input.tsx";
import { Option, Select } from "../../../ui/select/Select.tsx";
import { Icon } from "../../../ui/icon/Icon.tsx";
import { Button } from "../../../ui/button/Button.tsx";
import { FormState, SendingState } from "../../../../types/listsManager.ts";
import { useParams } from "react-router-dom";

const Errors = ({ serverErrors }: { serverErrors: ServerErrors[] }) => {
  return (
    <div className="flex flex-col gap-4">
      {serverErrors.map((error) => (
        <small
          key={error.path}
          className="flex items-center gap-1 text-red-500"
        >
          <Icon name="icon-[material-symbols--error]" />
          {error.msg}
        </small>
      ))}
    </div>
  );
};

interface ListFormProps {
  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formState: FormState;
  handleOnChange: (
    event:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | React.FormEvent<HTMLSelectElement>,
  ) => void;
  serverErrors: ServerErrors[];
  sendingState: SendingState;
}

interface ServerErrors {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

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

export const ListForm = ({
  handleOnSubmit,
  formState,
  handleOnChange,
  serverErrors,
  sendingState,
}: ListFormProps) => {
  const { id } = useParams();

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
    <form onSubmit={handleOnSubmit} className="space-y-4 md:space-y-8">
      <h2 className="text-xl text-gray-300 sm:text-2xl md:text-3xl lg:text-4xl">
        {id ? "Actualizar lista" : "Nueva lista"}
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
          <Select name="visibility" id="visibility" onChange={handleOnChange}>
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
  );
};
