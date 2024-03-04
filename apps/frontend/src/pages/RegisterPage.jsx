import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { Button } from "../components/ui/index.js";
import { clsx } from "clsx";
import backgroundImage from "../assets/backgrounds/register-wallpaper.webp";
import { AuthCard } from "../components/auth/AuthCard.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { Label } from "../components/ui/label/Label.jsx";
import { useState } from "react";

export const RegisterPage = () => {
  const { signup, errors } = useAuth();
  const {
    formData,
    handleOnChange,
    username,
    email,
    password,
    repassword,
    country,
  } = useForm({
    username: "",
    email: "",
    country: "",
    password: "",
    repassword: "",
  });
  const navigate = useNavigate();
  const { data, isLoading } = useFetch("http://localhost:3000/api/country");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      setButtonDisabled(true); // Desactivas el botón al inicio del envío
      const userData = await signup(formData);
      setButtonDisabled(false); // Reactivas el botón después de que se completa el envío

      if (userData) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setButtonDisabled(false); // También reactivas el botón en caso de error
    }
  };

  return (
    <div
      className="p-4 min-h-[100vh] bg-no-repeat bg-cover bg-center bg-fixed bg-opacity-50 bg-blur-3xl bg-gradient-to-b from-base-100 to-base-300"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%), url(${backgroundImage})`,
      }}
    >
      <div className="flex items-center mt-5 justify-evenly">
        <article className="flex flex-col items-center mt-3">
          <h1 className="text-4xl font-bold text-pink-500 uppercase">
            Your Backlog Adventure begins today!
          </h1>
          <h3 className="mt-4 text-xl font-bold text-center text-white text-balance">
            Embark on a journey to conquer your gaming backlog with GameNest! .
            Let the adventure begin!
          </h3>
        </article>
      </div>
      <AuthCard title="Register">
        <form onSubmit={handleOnSubmit}>
          <Label
            className={clsx(
              {
                "border-4 border-red-500":
                  errors && errors.some((err) => err.path == "username"),
                "border-0":
                  errors && !errors.some((err) => err.path == "username"),
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
                "border-0":
                  errors && !errors.some((err) => err.path == "email"),
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
            className="w-full max-w-xs mb-2 select select-bordered select-md"
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
          {errors && errors.find((err) => err.path == "pass") && (
            <p className="my-2 text-sm font-bold text-center text-red-500">
              {errors.find((err) => err.path == "pass").msg}
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
      </AuthCard>
    </div>
  );
};
