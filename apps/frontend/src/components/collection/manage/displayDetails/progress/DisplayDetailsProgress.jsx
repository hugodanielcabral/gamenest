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
      <h2 className="mb-2 uppercase col-span-4 text-2xl md:text-3xl font-semibold text-white md:text-left text-center">
        PROGRESS
      </h2>
      <article className="col-span-4 md:col-span-2 space-y-2">
        <h3 className="text-lg text-white">Status</h3>
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
        <h3 className="text-lg text-white">Progress Notes</h3>
        <Textarea
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
