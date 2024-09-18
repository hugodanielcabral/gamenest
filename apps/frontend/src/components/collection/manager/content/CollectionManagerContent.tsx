import { GameProps } from "../../../../types/collectionManager";
import { ContentPrimary } from "./primary/ContentPrimary";
import { useEffect, useState } from "react";
import { Button } from "../../../ui/button/Button.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Progress } from "../../../ui/progress/Progress.tsx";
import { Icon } from "../../../ui/icon/Icon.tsx";
import { useForm } from "../../../../hooks/useForm.ts";
import clsx from "clsx";
import { GET, PATCH, POST } from "../../../../services/apiServices.ts";
import { toast, Toaster } from "sonner";
import { ContentOptional } from "./optional/ContentOptional.tsx";

const initialPrimaryFormState = {
  platform_name: "",
  format_name: "",
  ownership_name: "",
  status_name: "",
};

const initialOptionalFormState = {
  store_name: "",
  rating: 0,
  amount_paid: 0,
  hours_played: 0,
  minutes_played: 0,
  start_date: "",
  finish_date: "",
  difficulty: "",
  is_favorite: false,
};


export const CollectionManagerContent = ({ game }: GameProps) => {
  const [formProgress, setFormProgress] = useState(0);
  const { pathname } = useLocation();

  const handleOnProgress = () => {
    if (formProgress === 100) {
      return;
    }

    setFormProgress((prev) => prev + 25);
  };

  const {
    formState: primaryFormState,
    handleOnChange,
    setFormState: setPrimaryFormState,
  } = useForm(initialPrimaryFormState, handleOnProgress);
  const {
    formState: optionalFormState,
    handleOnChange: handleOnOptionalChange,
    setFormState: setOptionalFormState,
  } = useForm(initialOptionalFormState);
  const [serverErrors, setServerErrors] = useState(null);
  const [buttonState, setButtonState] = useState<
    "default" | "sending" | "success"
  >("default");

  const navigate = useNavigate();

  useEffect(() => {
    if (pathname.includes("/update/")) {
      GET(`/collection/game/${game.slug}`)
        .then((data) => {
          if (!data) {
            toast.error("No se encontró información del juego");
            setTimeout(() => {
              navigate(`/games/${game.slug}`);
            }, 3000);
            return;
          }

          setPrimaryFormState({
            platform_name: data[0].platform_name || "",
            format_name: data[0].format_name || "",
            ownership_name: data[0].ownership_name || "",
            status_name: data[0].status_name || "",
          });

          setFormProgress(100);
          setOptionalFormState({
            store_name: data[0].store_name || "",
            rating: data[0].rating || 0,
            amount_paid: data[0].amount_paid || 0,
            hours_played: data[0].hours_played || 0,
            minutes_played: data[0].minutes_played || 0,
            start_date: data[0].start_date || "",
            finish_date: data[0].finish_date || "",
            difficulty: data[0].difficulty || "",
            is_favorite: data[0].is_favorite || false,
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Ocurrió un error al cargar la información del juego");
          setTimeout(() => {
            navigate(`/games/${game.slug}`);
          }, 3000);
        });
    }
  }, []);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (pathname.includes("/update/")) {
        setButtonState("sending");
        const updatedCollection = await PATCH(
          `/collection/update/game/${game.slug}`,
          {
            ownership_name: primaryFormState.ownership_name,
            store_name: optionalFormState.store_name,
            platform_name: primaryFormState.platform_name,
            format_name: primaryFormState.format_name,
            status_name: primaryFormState.status_name,
            hours_played: optionalFormState.hours_played,
            minutes_played: optionalFormState.minutes_played,
            amount_paid: optionalFormState.amount_paid,
            start_date: optionalFormState.start_date,
            finish_date: optionalFormState.finish_date,
            difficulty: optionalFormState.difficulty,
          },
        );

        if (!updatedCollection) {
          setButtonState("default");
          return toast.error(
            "Ocurrió un error al actualizar la información del juego",
          );
        }

        setButtonState("success");
        toast.success("La información del juego fue actualizada");
        setTimeout(() => {
          navigate(`/collection`);
        }, 2000);
        return;
      }

      setButtonState("sending");
      const newCollection = await POST(`/collection/add/game`, {
        game_id: game.id,
        game_slug: game.slug,
        game_name: game.name,
        game_cover: game.cover.url,
        platform_name: primaryFormState.platform_name,
        format_name: primaryFormState.format_name,
        ownership_name: primaryFormState.ownership_name,
        store_name: optionalFormState.store_name,
        status_name: primaryFormState.status_name,
        rating: optionalFormState.rating,
        amount_paid: optionalFormState.amount_paid,
        hours_played: optionalFormState.hours_played,
        minutes_played: optionalFormState.minutes_played,
        start_date: optionalFormState.start_date,
        finish_date: optionalFormState.finish_date,
        difficulty: optionalFormState.difficulty,
        is_favorite: optionalFormState.is_favorite,
      });

      if (!newCollection.ok) {
        setButtonState("default");
        const { errors } = await newCollection.json();

        setServerErrors(errors);
        return toast.error(
          "Ocurrió un error al agregar el juego a tu colección",
        );
      }

      setButtonState("success");
      setServerErrors(null);
      toast.success(`${game?.name} fue agregado a tu colección`);
      setTimeout(() => {
        navigate("/collection");
      }, 2000);
    } catch (error) {
      setButtonState("default");
      toast.error("Ocurrió un error al agregar el juego a tu colección");
    }
  };

  console.log(serverErrors);
  

  return (
    <form onSubmit={handleOnSubmit}>
      <Toaster richColors position="top-center" />
      <Progress
        className={clsx("mb-4", {
          "progress-success": formProgress === 100,
          "progress-warning": formProgress < 100,
        })}
        progressValue={formProgress}
        max="100"
      ></Progress>

      <ContentPrimary
        game={game}
        formState={primaryFormState}
        handleOnChange={handleOnChange}
      />
      <ContentOptional
        formState={optionalFormState}
        handleOnChange={handleOnOptionalChange}
        serverErrors={serverErrors}
      />

      <div className="flex justify-center p-4 md:justify-start">
        <Button
          type="submit"
          className="xl:btn-xl btn-xs mr-2 sm:btn-sm md:btn-md lg:btn-lg disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-400 disabled:opacity-75"
          variant="info"
          disabled={buttonState === "sending" || buttonState === "success"}
        >
          {buttonState === "sending" ? (
            <Icon name="icon-[eos-icons--hourglass]" />
          ) : (
            <Icon name="icon-[material-symbols--save]" />
          )}
          {buttonState === "sending" ? "Guardando" : "Guardar"}
        </Button>
        <Button
          type="button"
          className="xl:btn-xl btn-xs sm:btn-sm md:btn-md lg:btn-lg disabled:cursor-not-allowed disabled:border-gray-600 disabled:text-gray-400 disabled:opacity-75"
          variant="error"
          disabled={buttonState === "sending" || buttonState === "success"}
          onClick={() => navigate(`/games/${game.slug}`)}
        >
          <Icon name="icon-[material-symbols--cancel]" />
          Cancelar
        </Button>
      </div>
    </form>
  );
};
