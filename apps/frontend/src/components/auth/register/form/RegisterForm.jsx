import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Label, Input, Option } from "../../../ui/index.js";
import { clsx } from "clsx";
import { FaUser, FaMailBulk, FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { genderList } from "../../../../constants/auth/constantsAuth.js";

export const RegisterForm = ({
  handleOnSubmit,
  handleOnChange,
  data,
  isLoading,
  errors,
  username,
  email,
  country_id,
  password,
  repassword,
  status,
  handleOnPasswordVisibility,
  showPasswords,
  gender,
}) => {
  return (
    <form onSubmit={handleOnSubmit} className="space-y-3 mt-5">
      <Label
        className={clsx(
          {
            "border-2 border-error":
              errors && errors.some((err) => err.path == "username"),
            "border-0": errors && !errors.some((err) => err.path == "username"),
          },
          "mb-2 input input-bordered"
        )}
      >
        <FaUser className="w-4 h-4 opacity-70" />
        <Input
          className="grow"
          placeholder="Nombre de usuario"
          value={username}
          name="username"
          onChange={handleOnChange}
          autoComplete="name"
        />
      </Label>
      {errors && errors.find((err) => err.path == "username") && (
        <p className="mb-4 text-sm font-bold text-center text-error">
          {errors.find((err) => err.path == "username").msg}
        </p>
      )}
      <Label
        className={clsx(
          {
            "border-2 border-error":
              errors && errors.some((err) => err.path == "email"),
            "border-0": errors && !errors.some((err) => err.path == "email"),
          },
          "mb-2 input input-bordered"
        )}
      >
        <FaMailBulk className="w-4 h-4 opacity-70" />
        <Input
          type="email"
          className="grow"
          placeholder="Email"
          value={email}
          name="email"
          onChange={handleOnChange}
        />
      </Label>
      {errors && errors.find((err) => err.path == "email") && (
        <p className="mb-4 text-sm font-bold text-center text-error">
          {errors.find((err) => err.path == "email").msg}
        </p>
      )}
      <select
        name="country_id"
        className={clsx(
          {
            "border-2 border-error":
              errors && errors.some((err) => err.path == "country_id"),
            "border-0":
              errors && !errors.some((err) => err.path == "country_id"),
          },
          "w-full max-w-xs mb-2 select select-bordered select-md"
        )}
        onChange={handleOnChange}
        value={country_id}
      >
        <option disabled value="">
          Seleccione un país
        </option>
        {!isLoading &&
          data.map((country) => (
            <Option key={country.country_id} value={country.country_id}>
              {country.name}
            </Option>
          ))}
      </select>
      {errors && errors.find((err) => err.path == "country_id") && (
        <p className="mb-4 text-sm font-bold text-center text-error">
          {errors.find((err) => err.path == "country_id").msg}
        </p>
      )}
      <select
        name="gender"
        className={clsx(
          {
            "border-2 border-error":
              errors && errors.some((err) => err.path == "gender"),
            "border-0": errors && !errors.some((err) => err.path == "gender"),
          },
          "w-full max-w-xs mb-2 select select-bordered select-md"
        )}
        onChange={handleOnChange}
        value={gender}
      >
        <option disabled value="">
          Seleccione un genero
        </option>
        {genderList.map((gen) => (
          <Option key={gen.id} value={gen.id}>
            {gen.name}
          </Option>
        ))}
      </select>
      {errors && errors.find((err) => err.path == "country_id") && (
        <p className="mb-4 text-sm font-bold text-center text-error">
          {errors.find((err) => err.path == "country_id").msg}
        </p>
      )}
      <Label
        className={clsx(
          {
            "border-2 border-error":
              errors && errors.some((err) => err.path == "pass"),
            "border-0": errors && !errors.some((err) => err.path == "pass"),
          },
          "mb-2 input input-bordered"
        )}
      >
        <RiLockPasswordFill className="w-4 h-4 opacity-70" />
        <div className="w-full relative flex">
          <Input
            type={showPasswords.password ? "text" : "password"}
            className="grow"
            value={password}
            name="password"
            onChange={handleOnChange}
            placeholder="Contraseña"
            autoComplete="password"
          />
          {showPasswords.password ? (
            <FaEyeSlash
              className="absolute right-2 top-1 w-4 h-4 opacity-70 cursor-pointer fill-info"
              onClick={() => handleOnPasswordVisibility("password")}
            />
          ) : (
            <FaEye
              className="absolute right-2 top-1 w-4 h-4 opacity-70 cursor-pointer"
              onClick={() => handleOnPasswordVisibility("password")}
            />
          )}
        </div>
      </Label>
      {errors && errors.find((err) => err.path == "pass") && (
        <p className="mb-4 text-sm font-bold text-center text-error">
          {errors.find((err) => err.path == "pass").msg}
        </p>
      )}
      <Label
        className={clsx(
          {
            "border-2 border-error":
              errors && errors.some((err) => err.path == "repass"),
            "border-0": errors && !errors.some((err) => err.path == "repass"),
          },
          "mb-2 input input-bordered"
        )}
      >
        <RiLockPasswordFill className="w-4 h-4 opacity-70" />
        <div className="w-full flex relative">
          <Input
            type={showPasswords.repassword ? "text" : "password"}
            className="grow"
            value={repassword}
            name="repassword"
            onChange={handleOnChange}
            placeholder="Repetir contraseña"
            autoComplete="password"
          />
          {showPasswords.repassword ? (
            <FaEyeSlash
              className="absolute right-2 top-1 w-4 h-4 opacity-70 cursor-pointer fill-info"
              onClick={() => handleOnPasswordVisibility("repassword")}
            />
          ) : (
            <FaEye
              className="absolute right-2 top-1 w-4 h-4 opacity-70 cursor-pointer"
              name="repassword"
              onClick={() => handleOnPasswordVisibility("repassword")}
            />
          )}
        </div>
      </Label>
      {errors && errors.find((err) => err.path == "repass") && (
        <p className="mb-4 text-sm font-bold text-center text-error">
          {errors.find((err) => err.path == "repass").msg}
        </p>
      )}

      <p className="my-3 text-base text-center text-white">
        ¿Ya tienes una cuenta? {""}
        <Link to={"/login"} className="font-bold text-info">
          Inicia sesión.
        </Link>
      </p>
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="transition-all duration-500 ease-in-out  disabled:pointer-events-none disabled:opacity-15"
      >
        Registrarse
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
  country_id: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  repassword: propTypes.string.isRequired,
  status: propTypes.string,
  handleOnPasswordVisibility: propTypes.func.isRequired,
  showPasswords: propTypes.object.isRequired,
  gender: propTypes.string.isRequired,
};

RegisterForm.defaultProps = {
  data: [],
  errors: [],
  status: "",
  handleOnPasswordVisibility: () => {},
};
