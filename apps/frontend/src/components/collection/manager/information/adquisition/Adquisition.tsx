import clsx from "clsx";
import { Input } from "../../../../ui/input/Input.tsx";
import { Label } from "../../../../ui/label/Label.tsx";
import { Option, Select } from "../../../../ui/select/Select.tsx";
import {
  collectionDifficultyOptions,
  collectionStoreOptions,
} from "../../../../../data/collectionManager.ts";

import { ChangeEvent, FormEvent } from "react";

interface AdquisitionProps {
  formData: {
    hours_played: number;
    minutes_played: number;
    amount_paid: number;
    start_date: string;
    finish_date: string;
    difficulty: string;
    store_name: string;
  };
  handleOnChange: (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | FormEvent<HTMLSelectElement>,
  ) => void;
  serverErrors?:
    | {
        type: string;
        msg: string;
        value: string;
        path: string;
      }[]
    | null;
}

export const Adquisition = ({
  formData,
  handleOnChange,
  serverErrors,
}: AdquisitionProps) => {
  return (
    <div className="optional-info flex h-fit flex-col items-center justify-center gap-4 rounded-xl border border-gray-700 bg-base-100 p-4">
      <h3 className="text-sm text-gray-400 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        Datos de adquisición
      </h3>
      <Label
        title="Horas jugadas"
        className={clsx("w-full", {
          "border-error": serverErrors?.some(
            (error) => error.path === "hours_played",
          ),
          "border-0": !serverErrors?.some(
            (error) => error.path === "hours_played",
          ),
        })}
      >
        <Input
          type="number"
          name="hours_played"
          placeholder="Horas jugadas"
          value={formData.hours_played}
          onChange={(e) => handleOnChange(e)}
          max="99999"
        />
      </Label>
      {serverErrors?.some((error) => error.path === "hours_played") && (
        <small className="text-xs text-error">
          {serverErrors.find((error) => error.path === "hours_played")?.msg}
        </small>
      )}
      <Label
        title="Minutos jugados"
        className={clsx("w-full", {
          "border-error": serverErrors?.some(
            (error) => error.path === "minutes_played",
          ),
          "border-0": !serverErrors?.some(
            (error) => error.path === "minutes_played",
          ),
        })}
      >
        <Input
          type="number"
          name="minutes_played"
          placeholder="Minutos jugados"
          value={formData.minutes_played}
          onChange={(e) => handleOnChange(e)}
          min="0"
          max="60"
        />
      </Label>
      {serverErrors?.some((error) => error.path === "minutes_played") && (
        <small className="text-xs text-error">
          {serverErrors.find((error) => error.path === "minutes_played")?.msg}
        </small>
      )}

      <Label
        title="Total pagado"
        className={clsx("w-full", {
          "border-error": serverErrors?.some(
            (error) => error.path === "amount_paid",
          ),
          "border-0": !serverErrors?.some(
            (error) => error.path === "amount_paid",
          ),
        })}
      >
        <Input
          type="number"
          placeholder="Total pagado"
          name="amount_paid"
          value={formData.amount_paid}
          onChange={(e) => handleOnChange(e)}
          min="0"
        />
      </Label>
      {serverErrors?.some((error) => error.path === "amount_paid") && (
        <small className="text-xs text-error">
          {serverErrors.find((error) => error.path === "amount_paid")?.msg}
        </small>
      )}
      <Label
        title="Fecha de inicio"
        className={clsx("w-full", {
          "border-error": serverErrors?.some(
            (error) => error.path === "start_date",
          ),
          "border-0": !serverErrors?.some(
            (error) => error.path === "start_date",
          ),
        })}
      >
        <Input
          type="date"
          placeholder="Fecha de inicio"
          name="start_date"
          value={formData.start_date}
          onChange={(e) => handleOnChange(e)}
        />
      </Label>
      {serverErrors?.some((error) => error.path === "start_date") && (
        <small className="text-xs text-error">
          {serverErrors.find((error) => error.path === "start_date")?.msg}
        </small>
      )}

      <Label
        title="Fecha de finalización"
        className={clsx("w-full", {
          "border-error": serverErrors?.some(
            (error) => error.path === "finish_date",
          ),
          "border-0": !serverErrors?.some(
            (error) => error.path === "finish_date",
          ),
        })}
      >
        <Input
          type="date"
          placeholder="Fecha de finalización"
          name="finish_date"
          value={formData.finish_date}
          disabled={!formData.start_date}
          onChange={(e) => handleOnChange(e)}
        />
      </Label>
      {serverErrors?.some((error) => error.path === "finish_date") && (
        <small className="text-xs text-error">
          {serverErrors.find((error) => error.path === "finish_date")?.msg}
        </small>
      )}
      <Select
        name="difficulty"
        onChange={(e) => handleOnChange(e)}
        value={formData.difficulty}
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
        onChange={(e) => handleOnChange(e)}
        value={formData.store_name}
      >
        <Option text="Selecciona una tienda" disabled value="" />
        {collectionStoreOptions.map((store) => (
          <Option key={store.id} text={store.title} value={store.value} />
        ))}
      </Select>
    </div>
  );
};
