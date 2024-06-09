import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.ts";
import { BackgroundImage, CardBackground } from "../components/ui/index.js";
import validationPageBG from "../assets/backgrounds/validation-page-background.webp";
import gamenestLogo2 from "../assets/logos/gamenest-logo-2.webp";
import { Message } from "../components/auth/validation/Message.tsx";
import {
  invalidEmailValidation,
  successEmailValidation,
} from "../constants/auth/constantsValidation.ts";

export const ValidationPage = () => {
  const { token } = useParams<{ token: string }>();

  const { data, isLoading, error, hasError } = useFetch(
    `http://localhost:3000/api/user/validate/${token}`
  );



  return (
    <BackgroundImage backgroundImage={validationPageBG}>
      <div className="flex justify-center flex-col items-center">
        <Link to="/">
          <img
            src={gamenestLogo2}
            alt="GameNest Logo"
            className="transition-all duration-500 ease-in-out hover:scale-95"
          />
        </Link>

        {isLoading ? (
          <p>Validando...</p>
        ) : (
          <CardBackground className="mt-36 min-h-36 min-w-72 p-6 sm:p-8 md:p-10 lg:p-12 bg-opacity-70">
            {data ? (
              <Message message="Email validado correctamente." type="success" navigateTo="/login" btnMessage="Iniciar sesión"/>
            ) : (
              <>
                <Message message={error[0].msg} type="error" navigateTo="/" btnMessage="Regresar a inicio"/>
              </>
            )}
          </CardBackground>
        )}
      </div>
    </BackgroundImage>
  );
};
