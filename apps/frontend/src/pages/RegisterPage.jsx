import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch.js";
import { useForm } from "../hooks/useForm";
import { RegisterForm } from "../components/auth/register/form/RegisterForm.jsx";
import { AuthCard } from "../components/auth/AuthCard.jsx";
import { Toast } from "../components/ui/index.js";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import backgroundImage from "../assets/backgrounds/register-wallpaper.webp";

export const RegisterPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

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
  const { data, isLoading } = useFetch(`${BASE_URL}/country`);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      setButtonDisabled(true);

      const userData = await signup(formData);
      setButtonDisabled(false);

      if (userData) {
        setShowToast(true);
        sendWelcomeEmail();
        setButtonDisabled(true);
        setTimeout(() => {
          setShowToast(false);
          setButtonDisabled(false);
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setButtonDisabled(false);
    }
  };

  const templateParams = {
    user_name: username,
    destination: email,
  };

  const sendWelcomeEmail = () => {
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <div
      className="p-4 min-h-[100vh] bg-no-repeat bg-cover bg-center bg-fixed bg-opacity-50 bg-blur-3xl bg-gradient-to-b from-base-100 to-base-300"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%), url(${backgroundImage})`,
      }}
    >
      <Toast toastMessage="User created successfully!" showToast={showToast} />
      <div className="flex items-center mt-5 justify-evenly">
        <article className="flex flex-col items-center mt-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-error uppercase text-pretty text-center">
            Your Backlog Adventure begins today!
          </h1>
          <h3 className="mt-4 text-lg md:text-xl lg:text-2xl font-bold text-center text-white text-pretty">
            Embark on a journey to conquer your gaming backlog with GameNest! .
            Let the adventure begin!
          </h3>
        </article>
      </div>
      <AuthCard title="Register">
        <RegisterForm
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          data={data}
          isLoading={isLoading}
          errors={errors}
          username={username}
          email={email}
          country={country}
          password={password}
          repassword={repassword}
          buttonDisabled={buttonDisabled}
        />
      </AuthCard>
    </div>
  );
};
