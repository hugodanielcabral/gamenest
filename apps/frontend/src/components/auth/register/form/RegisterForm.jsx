import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Label } from "../../../ui/index.js";
import { clsx } from "clsx";

export const RegisterForm = ({
  handleOnSubmit,
  handleOnChange,
  data,
  isLoading,
  errors,
  username,
  email,
  country,
  password,
  repassword,
  buttonDisabled,
}) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <Label
        className={clsx(
          {
            "border-4 border-red-500":
              errors && errors.some((err) => err.path == "username"),
            "border-0": errors && !errors.some((err) => err.path == "username"),
          },
          "my-2"
        )}
      >
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
      {errors && errors.find((err) => err.path == "username") && (
        <p className="my-2 text-sm font-bold text-center text-red-500">
          {errors.find((err) => err.path == "username").msg}
        </p>
      )}
      <Label
        className={clsx(
          {
            "border-4 border-red-500":
              errors && errors.some((err) => err.path == "email"),
            "border-0": errors && !errors.some((err) => err.path == "email"),
          },
          "mb-2"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-4 h-4 opacity-70"
          fill="currentColor"
        >
          <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
        </svg>
        <input
          type="email"
          className="grow"
          placeholder="Email"
          value={email}
          name="email"
          onChange={handleOnChange}
        />
      </Label>
      {errors && errors.find((err) => err.path == "email") && (
        <p className="my-2 text-sm font-bold text-center text-red-500">
          {errors.find((err) => err.path == "email").msg}
        </p>
      )}
      <select
        name="country"
        className={clsx(
          {
            "border-4 border-red-500":
              errors && errors.some((err) => err.path == "country"),
            "border-0": errors && !errors.some((err) => err.path == "country"),
          },
          "w-full max-w-xs mb-2 select select-bordered select-md"
        )}
        onChange={handleOnChange}
        value={country}
      >
        <option disabled value="">
          Choose your country
        </option>
        {!isLoading &&
          data.map((country) => (
            <option key={country.country_id} value={country.country_id}>
              {country.country_name}
            </option>
          ))}
      </select>
      {errors && errors.find((err) => err.path == "country") && (
        <p className="mb-2 text-sm font-bold text-center text-red-500">
          {errors.find((err) => err.path == "country").msg}
        </p>
      )}
      <Label
        className={clsx(
          {
            "border-4 border-red-500":
              errors && errors.some((err) => err.path == "pass"),
            "border-0": errors && !errors.some((err) => err.path == "pass"),
          },
          "mb-2"
        )}
      >
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
      {errors && errors.find((err) => err.path == "pass") && (
        <p className="my-2 text-sm font-bold text-center text-red-500">
          {errors.find((err) => err.path == "pass").msg}
        </p>
      )}
      <Label
        className={clsx(
          {
            "border-4 border-red-500":
              errors && errors.some((err) => err.path == "repass"),
            "border-0": errors && !errors.some((err) => err.path == "repass"),
          },
          "mb-2"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-4 h-4 opacity-70"
          fill="currentColor"
        >
          <path
            fill="#74C0FC"
            d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"
          />
        </svg>
        <input
          type="password"
          className="grow"
          value={repassword}
          name="repassword"
          onChange={handleOnChange}
          placeholder="Repeat password"
          autoComplete="password"
        />
      </Label>
      {errors && errors.find((err) => err.path == "repass") && (
        <p className="my-2 text-sm font-bold text-center text-red-500">
          {errors.find((err) => err.path == "repass").msg}
        </p>
      )}

      <p className="my-3 text-base text-center text-white">
        Already have an account? {""}
        <Link to={"/login"} className="font-bold text-pink-500">
          Sign in.
        </Link>
      </p>
      <Button
        type="submit"
        disabled={buttonDisabled}
        className="transition-all duration-500 ease-in-out bg-gradient-to-r from-pink-400 via-pink-500 to-pink-700 hover:from-pink-500 hover:via-pink-600 hover:to-pink-700 disabled:pointer-events-none disabled:opacity-15"
      >
        Sign up
      </Button>
    </form>
  );
};

RegisterForm.propTypes = {
  handleOnSubmit: propTypes.func.isRequired,
  handleOnChange: propTypes.func.isRequired,
  data: propTypes.array,
  isLoading: propTypes.bool.isRequired,
  errors: propTypes.array,
  username: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  country: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  repassword: propTypes.string.isRequired,
  buttonDisabled: propTypes.bool.isRequired,
};
