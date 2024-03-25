import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { LoginForm } from "../components/auth/login/form/LoginForm.jsx";
import { AuthCard } from "../components/auth/AuthCard";
import { Toast } from "../components/ui/index.js";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/backgrounds/register-wallpaper.webp";

export const LoginPage = () => {
  const { signin, errors, setIsAuth } = useAuth();
  const { formData, handleOnChange, username, password } = useForm({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setButtonDisabled(true);
      const userData = await signin(formData);
      setButtonDisabled(false);

      //* Because setIsAuth is set to true, the page reloads automatically. This caused
      //* the inability to execute any message with the "data" return variable. I resolved this by moving
      //* setIsAuth to the handleSubmit function in the LoginPage component.
      if (userData) {
        setShowToast(true);
        setButtonDisabled(true);
        setTimeout(() => {
          setShowToast(false);
          setButtonDisabled(false);
          setIsAuth(true);
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setButtonDisabled(false);
    }
  };

  return (
    <div
      className="p-4 min-h-[100vh] bg-no-repeat bg-cover bg-center bg-fixed bg-opacity-50 bg-blur-3xl bg-gradient-to-b from-base-100 to-base-300"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%), url(${backgroundImage})`,
      }}
    >
      <Toast
        toastMessage="You've Logged In Successfully. Welcome!"
        showToast={showToast}
      />

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
        <LoginForm
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          errors={errors}
          buttonDisabled={buttonDisabled}
          username={username}
          password={password}
        />
      </AuthCard>
    </div>
  );
};
