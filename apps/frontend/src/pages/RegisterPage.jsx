import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch.js";
import { useForm } from "../hooks/useForm";
import { RegisterForm } from "../components/auth/register/form/RegisterForm.jsx";
import { AuthCard } from "../components/auth/AuthCard.jsx";
import { Button } from "../components/ui/index.js";
import { useNavigate } from "react-router-dom";
/* import emailjs from "@emailjs/browser";
 */ import backgroundImage from "../assets/backgrounds/register-wallpaper.webp";
import { Layout } from "../components/layout/Layout.jsx";
import clsx from "clsx";
const BASE_URL = import.meta.env.VITE_BASE_URL;

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
  const { data, isLoading } = useFetch(`${BASE_URL}/country`);
  const [hasUserBeenCreated, setUserCreated] = useState(false);
  const [status, setStatus] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    repassword: false,
  });

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      setStatus("submitting");

      const userData = await signup(formData);

      if (userData) {
        setUserCreated(true);
        /*         sendWelcomeEmail();
         */
        setStatus("success");
        setTimeout(() => {
          setStatus("");
          /* navigate("/login"); */
        }, 2000);
      }

      setStatus("error");
    } catch (error) {
      console.log(error);
      setStatus("");
    }
  };

  const handleOnPasswordVisibility = (pass) => {
    if (pass === "password")
      setShowPasswords({ ...showPasswords, password: !showPasswords.password });

    if (pass === "repassword")
      setShowPasswords({
        ...showPasswords,
        repassword: !showPasswords.repassword,
      });
  };
  /* const templateParams = {
    user_name: username,
    destination: email,
  }; */

  /*   const sendWelcomeEmail = () => {
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
 */
  return (
    <Layout>
      <div
        className="p-4 min-h-[100vh] bg-no-repeat bg-cover bg-center bg-fixed bg-opacity-50 bg-blur-3xl bg-gradient-to-b from-base-100 to-base-300"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%), url(${backgroundImage})`,
        }}
      >
        <div className="flex items-center mt-5 justify-evenly">
          <article className="flex flex-col items-center mt-3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-error uppercase text-pretty text-center">
              Your Backlog Adventure begins today!
            </h1>
            <h3 className="mt-4 text-base md:lg lg:text-xl font-bold text-center text-gray-300">
              Embark on a journey to conquer your gaming backlog with GameNest!.{" "}
              <br /> Let the adventure begin!
            </h3>
          </article>
        </div>

        <AuthCard
          title={hasUserBeenCreated ? "Success! 🎉" : "Register"}
          className={clsx(
            {
              "bg-base-300": !hasUserBeenCreated,
              "bg-success": hasUserBeenCreated,
            },
            "min-h-fit"
          )}
        >
          {hasUserBeenCreated ? (
            <div className="flex flex-col items-center mt-5 space-y-5">
              <p className="text-center text-white text-xl">
                You have successfully registered. Please login to continue.
              </p>
              <Button
                className="bg-white text-black font-bold hover:bg-opacity-80 hover:bg-white"
                onClick={() => navigate("/login")}
              >
                Login now
              </Button>
            </div>
          ) : (
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
              status={status}
              handleOnPasswordVisibility={handleOnPasswordVisibility}
              showPasswords={showPasswords}
            />
          )}
        </AuthCard>
      </div>
    </Layout>
  );
};
