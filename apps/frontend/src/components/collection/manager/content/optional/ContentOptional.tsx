import {
  collectionDifficultyOptions,
  collectionStoreOptions,
} from "../../../../../data/collectionManager.ts";
import { Input } from "../../../../ui/input/Input.tsx";
import { Label } from "../../../../ui/label/Label.tsx";
import { Option, Select } from "../../../../ui/select/Select.tsx";
import clsx from "clsx";

interface ContentOptionalProps {
  formState: {
    hours_played: number;
    minutes_played: number;
    amount_paid: number;
    start_date: string;
    finish_date: string;
    difficulty: string;
    store_name: string;
  };
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  serverErrors:
    | {
        type: string;
        value: string;
        msg: string;
        path: string;
      }[]
    | null;
}

export const ContentOptional = ({
  formState,
  handleOnChange,
  serverErrors,
}: ContentOptionalProps) => {
  return (
    <div className="space-y-6 p-4">
      <div className="divider divider-neutral"></div>
      <div className="flex items-center justify-center gap-4">
        <h2 className="text-center text-xl text-gray-300 sm:text-2xl md:text-3xl lg:text-4xl">
          Datos opcionales
        </h2>
      </div>
      <section className="flex flex-col gap-4">
        {serverErrors?.length > 0 && (
          <div className="mx-auto mt-4 max-w-6xl rounded-lg border border-gray-600 bg-error p-2 md:p-2">
            <ol className="flex flex-wrap gap-4">
              {serverErrors?.map((error, index) => (
                <li key={error.path} className="text-white">
                  <small className="text-xs">
                    {" "}
                    {index + 1}.{error.msg}
                  </small>
                </li>
              ))}
            </ol>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <Label title="Horas jugadas">
            <Input
              type="number"
              name="hours_played"
              placeholder="Horas jugadas"
              value={formState.hours_played}
              className={clsx("w-full", {
                "border-error": serverErrors?.some(
                  (error) => error.path === "hours_played",
                ),
                "border-0": !serverErrors?.some(
                  (error) => error.path === "hours_played",
                ),
              })}
              onChange={
                handleOnChange as unknown as (
                  e: React.ChangeEvent<HTMLInputElement>,
                ) => void
              }
              max="999999"
            />
          </Label>

          <Label title="Minutos jugados">
            <Input
              type="number"
              name="minutes_played"
              placeholder="Minutos jugados"
              value={formState.minutes_played}
              className={clsx("w-full", {
                "border-error": serverErrors?.some(
                  (error) => error.path === "minutes_played",
                ),
                "border-0": !serverErrors?.some(
                  (error) => error.path === "minutes_played",
                ),
              })}
              onChange={handleOnChange}
              max="59"
            />
          </Label>
          <Label title="Total pagado" className="">
            <Input
              type="number"
              name="amount_paid"
              placeholder="Total pagado"
              value={formState.amount_paid}
              className={clsx("w-full", {
                "border-error": serverErrors?.some(
                  (error) => error.path === "amount_paid",
                ),
                "border-0": !serverErrors?.some(
                  (error) => error.path === "amount_paid",
                ),
              })}
              onChange={handleOnChange}
              max="999999"
            />
          </Label>
          <Label title="Fecha de inicio">
            <Input
              type="date"
              placeholder="Fecha de inicio"
              name="start_date"
              value={formState.start_date}
              className={clsx("w-full", {
                "border-error": serverErrors?.some(
                  (error) => error.path === "start_date",
                ),
                "border-0": !serverErrors?.some(
                  (error) => error.path === "start_date",
                ),
              })}
              onChange={(e) => handleOnChange(e)}
            />
          </Label>
          <Label title="Fecha de finalización">
            <Input
              type="date"
              placeholder="Fecha de finalización"
              name="finish_date"
              value={formState.finish_date}
              className={clsx("w-full", {
                "border-error": serverErrors?.some(
                  (error) => error.path === "finish_date",
                ),
                "border-0": !serverErrors?.some(
                  (error) => error.path === "finish_date",
                ),
              })}
              disabled={!formState.start_date}
              onChange={(e) => handleOnChange(e)}
            />
          </Label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            name="difficulty"
            onChange={
              handleOnChange as unknown as (
                e: React.ChangeEvent<HTMLSelectElement>,
              ) => void
            }
            value={formState.difficulty}
            className={clsx("w-full", {
              "border-error": serverErrors?.some(
                (error) => error.path === "difficulty",
              ),
              "border-0": !serverErrors?.some(
                (error) => error.path === "difficulty",
              ),
            })}
          >
            <Option text="Selecciona una dificultad" disabled value="" />
            {collectionDifficultyOptions.map((difficulty) => (
              <Option
                key={difficulty.id}
                text={difficulty.title}
                value={difficulty.value}
              />
            ))}
          </Select>
          <Select
            name="store_name"
            onChange={
              handleOnChange as unknown as (
                e: React.ChangeEvent<HTMLSelectElement>,
              ) => void
            }
            value={formState.store_name}
            className={clsx("w-full", {
              "border-error": serverErrors?.some(
                (error) => error.path === "store_name",
              ),
              "border-0": !serverErrors?.some(
                (error) => error.path === "store_name",
              ),
            })}
          >
            <Option text="Selecciona una tienda" disabled value="" />
            {collectionStoreOptions.map((store) => (
              <Option key={store.id} text={store.title} value={store.value} />
            ))}
          </Select>
        </div>
      </section>
    </div>
  );
};
