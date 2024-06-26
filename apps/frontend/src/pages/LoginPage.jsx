import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { LoginForm } from "../components/auth/login/form/LoginForm.jsx";
import { AuthCard } from "../components/auth/AuthCard";
import { BackgroundImage, Toast } from "../components/ui/index.js";
import backgroundImage from "../assets/backgrounds/register-wallpaper.webp";
import { Layout } from "../components/layout/Layout.jsx";

export const LoginPage = () => {
  const { signin, errors, setIsAuth, setErrors } = useAuth();
  const { formData, handleOnChange, username, password } = useForm({
    username: "",
    password: "",
  });
  const [status, setStatus] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setStatus("submitting");
      const userData = await signin(formData);

      //* Because setIsAuth is set to true, the page reloads automatically. This caused
      //* the inability to execute any message with the "data" return variable. I resolved this by moving
      //* setIsAuth to the handleSubmit function in the LoginPage component.
      if (userData) {
        setErrors([]);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setIsAuth(true);
          //* I use location.href instead of Navigate, because i had issues with the Navigate component.
          //* The navigate was not "rendering" the navbar, so i could not access private routes links.
          window.location.href = "/";
        }, 2000);

        return;
      }

      setStatus("");
    } catch (error) {
      console.log(error);
      setStatus("");
    }
  };

  const handleOnPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <BackgroundImage backgroundImage={backgroundImage}>
        <Toast
          toastMessage="Inicio de sesión exitoso! Bienvenido de vuelta!"
          showToast={showToast}
        />

        <div className="flex items-center mt-5 justify-evenly">
          <article className="flex flex-col items-center mt-3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-error uppercase text-pretty text-center">
              War, war never changes.
            </h1>
            <h3 className="mt-4 text-base md:lg lg:text-xl font-bold text-center text-gray-300">
              Bienvenido de vuelta, guerrero.
            </h3>
          </article>
        </div>

        <AuthCard title="Inicio de sesión">
          <LoginForm
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            errors={errors}
            status={status}
            username={username}
            password={password}
            showPassword={showPassword}
            handleOnPasswordVisibility={handleOnPasswordVisibility}
          />
        </AuthCard>
      </BackgroundImage>
    </Layout>
  );
};
