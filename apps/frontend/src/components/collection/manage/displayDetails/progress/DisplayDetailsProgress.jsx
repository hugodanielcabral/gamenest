import propTypes from "prop-types";
import { GAME_STATUS } from "../../../../../utils/constants";
import { Radio } from "../../../../ui/radio/Radio";
import { Textarea } from "../../../../ui/textarea/Textarea";

export const DisplayDetailsProgress = ({
  status,
  progress_note,
  handleOnChange,
}) => {
  return (
    <section className="grid grid-cols-4 *:mt-2">
      <h2 className="mb-2 uppercase col-span-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white md:text-left text-center">
        PROGRESS
      </h2>
      <article className="col-span-4 md:col-span-2 space-y-2">
        <h3 className="text-base text-center md:text-left sm:text-lg md:text-xl text-white">
          Status
        </h3>
        <div className="flex gap-2 justify-center md:justify-start max-w-[30rem] flex-wrap">
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
      <article className="col-span-4 md:col-span-2 space-y-2">
        <h3 className="text-base text-center md:text-left sm:text-lg md:text-xl text-white">
          Progress Notes
        </h3>
        <Textarea
          placeholder="I am currently playing this game and I am at level 5."
          name="progress_note"
          value={progress_note}
          onChange={handleOnChange}
        />
      </article>
    </section>
  );
};

DisplayDetailsProgress.propTypes = {
  status: propTypes.string.isRequired,
  progress_note: propTypes.string.isRequired,
  handleOnChange: propTypes.func.isRequired,
};

DisplayDetailsProgress.defaultProps = {
  status: "",
  progress_note: "",
};
