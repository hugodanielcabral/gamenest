import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { Label, Button, Input } from "../../../ui/index.js";
import { clsx } from "clsx";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { AuthErrors } from "../../error/AuthErrors.tsx";

export const LoginForm = ({
  handleSubmit,
  handleOnChange,
  errors,
  status,
  username,
  password,
  showPassword,
  handleOnPasswordVisibility,
}) => {
  return (
    <form className="*:my-3" onSubmit={handleSubmit}>
      <Label
        className={clsx(
          {
            "border-error":
              errors && errors.some((err) => err.path === "username"),
          },
          "my-2 input input-bordered"
        )}
      >
        <FaUser className="w-4 h-4 opacity-70" />
        <Input
          type="text"
          className="grow"
          placeholder="Nombre de usuario"
          value={username}
          name="username"
          onChange={handleOnChange}
          autoComplete="name"
        />
      </Label>
      <AuthErrors errors={errors} inputField="username" />
      <Label
        className={clsx(
          {
            "border-error":
              errors && errors.some((err) => err.path === "password"),
          },
          "my-2 input input-bordered"
        )}
      >
        <RiLockPasswordFill className="w-4 h-4 opacity-70" />

        <div className="w-full relative flex">
          <Input
            type={showPassword ? "text" : "password"}
            className="grow"
            value={password}
            name="password"
            onChange={handleOnChange}
            placeholder="Contraseña"
            autoComplete="password"
          />
          {showPassword ? (
            <FaEyeSlash
              className="absolute right-2 top-1 w-4 h-4 opacity-70 cursor-pointer fill-info"
              onClick={handleOnPasswordVisibility}
            />
          ) : (
            <FaEye
              className="absolute right-2 top-1 w-4 h-4 opacity-70 cursor-pointer"
              onClick={handleOnPasswordVisibility}
            />
          )}
        </div>
      </Label>
      <AuthErrors errors={errors} inputField="password" />
      <p className="my-3 text-base text-center text-white">
        ¿No tienes una cuenta? {""}
        <Link to={"/register"} className="font-bold text-info">
          Registrate.
        </Link>
      </p>

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="transition-all duration-500 ease-in-out  disabled:pointer-events-none disabled:opacity-15"
      >
        Iniciar sesión
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  handleOnChange: propTypes.func.isRequired,
  errors: propTypes.array,
  status: propTypes.string,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  showPassword: propTypes.bool.isRequired,
  handleOnPasswordVisibility: propTypes.func.isRequired,
};

LoginForm.defaultProps = {
  errors: [],
  status: "",
  showPassword: false,
  handleOnPasswordVisibility: () => {},
};
