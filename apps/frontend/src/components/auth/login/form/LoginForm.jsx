import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { Label, Button } from "../../../ui/index.js";
import { clsx } from "clsx";

export const LoginForm = ({
  handleSubmit,
  handleOnChange,
  errors,
  buttonDisabled,
  username,
  password,
}) => {
  return (
    <form className="*:my-3" onSubmit={handleSubmit}>
      <h3>
        {errors && (
          <p className="py-2 my-2 text-sm font-bold text-center text-red-500 bg-red-100">
            {errors[0].msg}
          </p>
        )}
      </h3>
      <Label className={clsx("my-2")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-4 h-4 opacity-70"
          fill="currentColor"
        >
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Username"
          value={username}
          name="username"
          onChange={handleOnChange}
          autoComplete="name"
        />
      </Label>
      <Label className={clsx("mb-2")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-4 h-4 opacity-70"
          fill="currentColor"
        >
          <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
        </svg>

        <input
          type="password"
          className="grow"
          value={password}
          name="password"
          onChange={handleOnChange}
          placeholder="Password"
          autoComplete="password"
        />
      </Label>
      <p className="my-3 text-base text-center text-white">
        Don&apos;t have an account? {""}
        <Link to={"/register"} className="font-bold text-pink-500">
          Sign up.
        </Link>
      </p>
      <p className="my-3 text-base text-center text-white">
        <Link className="font-bold text-pink-500">Forgot password?</Link>
      </p>
      <Button
        type="submit"
        disabled={buttonDisabled}
        className="transition-all duration-500 ease-in-out bg-gradient-to-r from-pink-400 via-pink-500 to-pink-700 hover:from-pink-500 hover:via-pink-600 hover:to-pink-700 disabled:pointer-events-none disabled:opacity-15"
      >
        Sign in
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  handleOnChange: propTypes.func.isRequired,
  errors: propTypes.array,
  buttonDisabled: propTypes.bool.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
};
