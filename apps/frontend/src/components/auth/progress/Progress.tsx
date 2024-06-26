import { useEffect, useState } from "react";
import { getTotalProgress } from "../../../utils/getTotalProgress";
import trasureMapImg from "../../../assets/auth/treasure-map.png";
import closedTreasureChest from "../../../assets/auth/closed-trasure-chest.png";
import openTreasureChest from "../../../assets/auth/open-treasure-chest.png";

type ProgressProps = {
  formValues: {
    username?: string;
    email?: string;
    country_id?: string;
    password?: string;
    repassword?: string;
  };

  clientErrors: {
    username?: string;
    email?: string;
    country_id?: string;
    password?: string;
    repassword?: string;
  };
};

export const Progress = ({ formValues, clientErrors }: ProgressProps) => {
  const [progressValue, setProgressValue] = useState({
    username: 0,
    email: 0,
    country_id: 0,
    password: 0,
    repassword: 0,
  });

  useEffect(() => {
    const updateProgressValue = (
      fieldKey: string,
      errorCondition: string | undefined,
      valueCondition: boolean,
    ) => {
      setProgressValue((prev) => ({
        ...prev,
        [fieldKey]: errorCondition ? 0 : valueCondition ? 20 : prev[fieldKey],
      }));
    };

    updateProgressValue(
      "username",
      clientErrors?.username,
      formValues.username !== "",
    );
    updateProgressValue("email", clientErrors?.email, formValues.email !== "");
    updateProgressValue(
      "country_id",
      clientErrors?.country_id,
      formValues.country_id !== "",
    );
    updateProgressValue(
      "password",
      clientErrors?.password,
      formValues.password !== "",
    );
    updateProgressValue(
      "repassword",
      clientErrors?.repassword,
      formValues.repassword !== "",
    );
  }, [clientErrors, formValues]);

  return (
    <div className="flex items-center">
      <img src={trasureMapImg} alt="Mapa del tesoro" className="w-12" />
      <progress
        className="progress progress-success"
        id="progressBar"
        max="100"
        value={getTotalProgress(progressValue)}
      ></progress>
      {getTotalProgress(progressValue) === 100 ? (
        <img
          src={openTreasureChest}
          alt="Cofre del tesoro abierto"
          className="w-12"
        />
      ) : (
        <img
          src={closedTreasureChest}
          alt="Cofre del tesoro cerrado"
          className="w-12"
        />
      )}
    </div>
  );
};
