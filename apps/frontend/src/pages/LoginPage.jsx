import backgroundImage from "../assets/backgrounds/register-wallpaper.webp";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { AuthCard } from "../components/auth/AuthCard";
import { Button, Label } from "../components/ui/index.js";
import { clsx } from "clsx";

export const LoginPage = () => {
  const { signin, errors } = useAuth();
  const { formData, handleOnChange, username, password } = useForm({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await signin(formData);

    if (userData) navigate("/");
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
            Unlock Your Gaming Realm
          </h1>
          <h3 className="mt-4 text-xl font-bold text-center text-white text-balance">
            Continue Your Backlog Adventure with GameNest! Ready to Dive Back
            In?
          </h3>
        </article>
      </div>

      <AuthCard title="Login">
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

          <Button
            type="submit"
            className="transition-all duration-500 ease-in-out bg-gradient-to-r from-pink-400 via-pink-500 to-pink-700 hover:from-pink-500 hover:via-pink-600 hover:to-pink-700 disabled:pointer-events-none disabled:opacity-15"
          >
            Sign in
          </Button>
        </form>
      </AuthCard>
    </div>
  );
};
