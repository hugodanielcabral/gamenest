import backgroundImage from "../assets/backgrounds/register-wallpaper.webp";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { AuthCard } from "../components/auth/AuthCard";
import { Button } from "../components/ui";

export const LoginPage = () => {
  const { signin } = useAuth();
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
      className="p-4 min-h-[100vh] bg-no-repeat bg-cover bg-center bg-fixed bg-opacity-50 bg-blur-3xl bg-gradient-to-b from-base-100 to-base-200"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), url(${backgroundImage})`,
      }}
    >
      <div className="flex flex-col items-center mt-3">
        <h1 className="text-3xl text-white">
          <span className="font-bold">Game</span>
          <span className="font-bold text-red-500">Nest</span>: Your Backlog
          Adventure
        </h1>
        <h3 className="mt-4 text-xl text-center text-white text-balance">
          Welcome back!
        </h3>
      </div>

      <AuthCard title="Login">
        <form className="*:my-3" onSubmit={handleSubmit}>
          <label className="flex items-center gap-2 input input-bordered">
            Username
            <input
              type="text"
              className="grow invalid:bg-orange-500"
              placeholder="lordfallen1"
              value={username}
              name="username"
              onChange={handleOnChange}
              minLength={6}
            />
          </label>
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

          <Button type="submit">Sign in</Button>
        </form>
      </AuthCard>
    </div>
  );
};
