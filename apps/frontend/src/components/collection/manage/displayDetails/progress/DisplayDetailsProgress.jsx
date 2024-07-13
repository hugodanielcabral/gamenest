import propTypes from "prop-types";
import { GAME_STATUS } from "../../../../../utils/constants";
import { Radio } from "../../../../ui/radio/Radio";
import { Textarea } from "../../../../ui/textarea/Textarea";
import { Input } from "../../../../ui";
import { Label } from "../../../../ui";
import clsx from "clsx";

export const DisplayDetailsProgress = ({
  status,
  progress_note,
  handleOnChange,
  total_played,
  start_date,
  finish_date,
  amount_paid,
}) => {
  return (
    <section className="grid grid-cols-4 space-y-8">
      <h2 className="col-span-4 mb-2 text-center text-lg font-semibold uppercase text-red-500 sm:text-xl md:text-left md:text-2xl lg:text-3xl">
        Progreso
      </h2>
      <article className="col-span-4 space-y-2 md:col-span-2">
        <h3 className="text-center text-base text-white sm:text-lg md:text-left md:text-xl">
          Estado
        </h3>
        <div className="flex max-w-[30rem] flex-wrap justify-center gap-2 md:justify-start">
          {GAME_STATUS.map((gameStatus) => (
            <Radio
              key={gameStatus.id}
              option={gameStatus}
              selectedOption={status}
              handleOnChange={handleOnChange}
              name="status"
            />
          ))}
        </div>
      </article>
      <article className="col-span-4 space-y-2 md:col-span-2">
        <h3 className="text-center text-base text-white sm:text-lg md:text-left md:text-xl">
          Notas de progreso
        </h3>
        <Textarea
          placeholder="Notas de progreso..."
          name="progress_note"
          value={progress_note}
          onChange={handleOnChange}
        />
      </article>
      <article className="col-span-4 grid grid-cols-4 items-center justify-center gap-2 space-y-2 md:col-span-4">
        <Label className="flex-col text-center text-xs text-white sm:text-sm md:text-left md:text-base">
          Horas jugadas
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={10000}
            name="total_played"
            value={total_played}
            onChange={handleOnChange}
            className={clsx(
              {
                "border-2 border-info": total_played > 0,
                "border-2 border-gray-700":
                  total_played === "" || total_played === 0,
              },
              "duration-70 rounded-md bg-base-100 p-1 transition-colors",
            )}
          />
        </Label>
        <Label className="flex-col text-center text-xs text-white sm:text-sm md:text-left md:text-base">
          Fecha de comienzo
          <Input
            type="date"
            name="start_date"
            value={start_date}
            onChange={handleOnChange}
            className={clsx(
              {
                "border-2 border-info": start_date !== "",
                "border-2 border-gray-700": start_date === "",
              },
              "duration-70 rounded-md bg-base-100 p-1 transition-colors",
            )}
          />
        </Label>
        <Label className="flex-col text-center text-xs text-white sm:text-sm md:text-left md:text-base">
          Fecha de finalización
          <Input
            type="date"
            name="finish_date"
            value={finish_date}
            disabled={start_date === ""}
            onChange={handleOnChange}
            className={clsx(
              {
                "border-2 border-info": finish_date !== "",
                "border-2 border-gray-700": finish_date === "",
              },
              "duration-70 rounded-md bg-base-100 p-1 transition-colors disabled:cursor-not-allowed disabled:bg-gray-700",
            )}
          />
        </Label>
        <Label className="flex-col text-center text-xs text-white sm:text-sm md:text-left md:text-base">
          Total pagado
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000000}
            name="amount_paid"
            value={amount_paid}
            onChange={handleOnChange}
            className={clsx(
              {
                "border-2 border-info": amount_paid > 0,
                "border-2 border-gray-700":
                  amount_paid === "" || amount_paid === 0,
              },
              "duration-70 rounded-md bg-base-100 p-1 transition-colors",
            )}
          />
        </Label>
      </article>
    </section>
  );
};

DisplayDetailsProgress.propTypes = {
  status: propTypes.string.isRequired,
  progress_note: propTypes.string.isRequired,
  total_played: propTypes.number.isRequired,
  start_date: propTypes.string.isRequired,
  finish_date: propTypes.string.isRequired,
  amount_paid: propTypes.number.isRequired,
  handleOnChange: propTypes.func.isRequired,
};

DisplayDetailsProgress.defaultProps = {
  status: "",
  progress_note: "",
  total_played: 0,
  start_date: "",
  finish_date: "",
  amount_paid: 0,
};
