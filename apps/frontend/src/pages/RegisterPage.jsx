import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { Button } from "../components/ui/index.js";
import { clsx } from "clsx";
import backgroundImage from "../assets/backgrounds/register-wallpaper.webp";

export const RegisterPage = () => {
  const { signup, errors } = useAuth();
  const { formData, handleOnChange, username, email, password, repassword } =
    useForm({
      username: "",
      email: "",
      password: "",
      repassword: "",
    });
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const userData = await signup(formData);

    if (userData) {
      navigate("/login");
    }
  };

  return (
    <div
      className="p-4 min-h-[100vh] bg-no-repeat bg-cover bg-center bg-fixed bg-opacity-50 bg-blur-3xl bg-gradient-to-b from-base-100 to-base-200"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), url(${backgroundImage})`,
      }}
    >
      <h1>GameNest: Your Backlog Adventure</h1>
      <h3>
        Embark on a journey to conquer your gaming backlog with GameNest! Create
        your account, dive into your collection, and join fellow gamers in the
        quest to tackle those untouched games. Let the adventure begin!
      </h3>
      <div className="mx-auto mt-32">
        <form className="*:my-3" onSubmit={handleOnSubmit}>
          <label className="flex items-center gap-2 input input-bordered">
            Username
            <input
              type="text"
              className="grow"
              placeholder="lordfallen1"
              value={username}
              name="username"
              onChange={handleOnChange}
              minLength={6}
              autoComplete="name"
            />
          </label>
          {errors &&
            errors
              .filter((err) => err.path == "username")
              .map((err) => (
                <p className="text-center text-red-500">{err.msg}</p>
              ))}
          <label className="flex items-center gap-2 input input-bordered">
            Email
            <input
              type="email"
              className="grow"
              placeholder="youremail@gmail.com"
              value={email}
              name="email"
              onChange={handleOnChange}
            />
          </label>
          {errors &&
            errors
              .filter((err) => err.path == "email")
              .map((err) => (
                <p className="text-center text-red-500">{err.msg}</p>
              ))}
          <label className="flex items-center gap-2 input input-bordered">
            Password
            <input
              type="password"
              className="grow"
              value={password}
              name="password"
              onChange={handleOnChange}
            />
          </label>
          {errors &&
            errors
              .filter((err) => err.path == "pass")
              .map((err) => (
                <p className="text-center text-red-500">{err.msg}</p>
              ))}
          <label className="flex items-center gap-2 input input-bordered">
            Repeat your password
            <input
              type="password"
              className="grow"
              value={repassword}
              name="repassword"
              onChange={handleOnChange}
            />
          </label>
          {errors &&
            errors
              .filter((err) => err.path == "pass")
              .map((err) => (
                <p className="text-center text-red-500">{err.msg}</p>
              ))}
          <Button
            type="submit"
            /* className={clsx({
              "bg-green-500": value == 10,
            })} */
          >
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
};
