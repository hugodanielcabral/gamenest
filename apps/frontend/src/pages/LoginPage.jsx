import backgroundImage from "../assets/backgrounds/register-wallpaper.webp";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";

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
      <h1>Good morning, Vault-Tec calling!</h1>

      <div className="mx-auto mt-32 size-96">
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

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
