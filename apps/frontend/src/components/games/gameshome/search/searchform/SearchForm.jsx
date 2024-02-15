import propTypes from "prop-types";

export const SearchForm = ({
  handleSubmit,
  onInputChange,
  deleteQueryParam,
  inputSearchValue,
  setInputSearchValue,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          className="w-full p-2 text-lg border-2 appearance-none text-base-100 bg-base-content focus-visible:border-info "
          placeholder="Search game"
          aria-label="Search a specific game"
          value={inputSearchValue}
          onChange={onInputChange}
        />
      </form>
      <button
        className={`absolute text-xl transform -translate-y-1/2 text-error right-3 top-1/2 hover:text-error/60 font-extrabold ${
          !inputSearchValue && "hidden"
        }`}
        onClick={() => {
          deleteQueryParam("gamename");
          setInputSearchValue("");
        }}
      >
        X
      </button>
    </>
  );
};

SearchForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  onInputChange: propTypes.func.isRequired,
  deleteQueryParam: propTypes.func.isRequired,
  inputSearchValue: propTypes.string.isRequired,
  setInputSearchValue: propTypes.func.isRequired,
};
