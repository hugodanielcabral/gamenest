import { useForm } from "../../../../hooks/useForm";
import { GameProps } from "../../../../types/collectionManager.ts";
import { Button } from "../../../ui/button/Button.tsx";
import { useEffect, useState } from "react";
import { GET, POST, PATCH } from "../../../../services/apiServices.ts";
import { Toaster, toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import "./ManagerInformation.css";
import { Adquisition } from "./adquisition/Adquisition.tsx";
import { PrimaryInfo } from "./primary/PrimaryInfo.tsx";

interface ServerErrors {
  type: string;
  value: string;
  msg: string;
  path: string;
}

export const ManagerInformation = ({ game }: GameProps) => {
  const {
    ownership_name,
    store_name,
    platform_name,
    format_name,
    status_name,
    hours_played,
    minutes_played,
    amount_paid,
    start_date,
    finish_date,
    difficulty,
    handleOnChange,
    setFormData,
    formData,
  } = useForm({
    ownership_name: "",
    store_name: "",
    platform_name: "",
    format_name: "",
    status_name: "",
    hours_played: 0,
    minutes_played: 0,
    amount_paid: 0,
    start_date: "",
    finish_date: "",
    difficulty: "",
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [serverErrors, setServerErrors] = useState<ServerErrors[]>(null);

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setBtnDisabled(true);

      if (pathname.includes("/update/")) {
        const updatedCollection = await PATCH(
          `/collection/update/game/${game.slug}`,
          {
            ownership_name,
            store_name,
            platform_name,
            format_name,
            status_name,
            hours_played,
            minutes_played,
            amount_paid,
            start_date,
            finish_date,
            difficulty,
          },
        );

        if (!updatedCollection) {
          setBtnDisabled(false);
          return toast.error(
            "Ocurrió un error al actualizar la información del juego",
          );
        }

        toast.success(`${game?.name} fue actualizado en tu colección`);
        setTimeout(() => {
          navigate("/collection");
        }, 2000);
        return;
      }

      const newCollection = await POST("/collection/add/game", {
        game_id: game.id,
        game_slug: game.slug,
        game_name: game.name,
        game_cover: game.cover.url,
        platform_name,
        format_name,
        ownership_name,
        store_name,
        status_name,
        rating: 0,
        amount_paid,
        hours_played,
        minutes_played,
        start_date,
        finish_date,
        difficulty,
        is_favorite: true,
      });

      if (!newCollection.ok) {
        setBtnDisabled(false);
        const { errors } = await newCollection.json();

        setServerErrors(errors);
        return toast.error(
          "Ocurrió un error al agregar el juego a tu colección",
        );
      }

      setServerErrors(null);
      toast.success(`${game?.name} fue agregado a tu colección`);
      setTimeout(() => {
        navigate("/collection");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (pathname.includes("/update/")) {
      GET(`/collection/game/${game.slug}`)
        .then((data) => {
          if (data) {
            setFormData({
              ownership_name: data[0].ownership_name || "",
              store_name: data[0].store_name || "",
              platform_name: data[0].platform_name || "",
              format_name: data[0].format_name || "",
              status_name: data[0].status_name || "",
              hours_played: data[0].hours_played || 0,
              minutes_played: data[0].minutes_played || 0,
              amount_paid: data[0].amount_paid || 0,
              start_date: data[0].start_date
                ? DateTime.fromISO(data[0].start_date, {
                    zone: "utc",
                  }).toISODate()
                : "",
              finish_date: data[0].finish_date
                ? DateTime.fromISO(data[0].finish_date, {
                    zone: "utc",
                  }).toISODate()
                : "",
              difficulty: data[0].difficulty || "",
            });
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Ocurrió un error al obtener la información del juego");
        });
    }
  }, [pathname, game.slug, setFormData]);

  return (
    <section className="p-4">
      <Toaster richColors position="top-center" />
      <form onSubmit={handleOnSubmit} className="manager-container gap-4">
        <PrimaryInfo
          formData={formData}
          game={game}
          handleOnChange={handleOnChange}
        />
        <Adquisition
          formData={formData}
          handleOnChange={handleOnChange}
          serverErrors={serverErrors}
        />
        <div className="col-span-full flex">
          <Button
            type="submit"
            className="mr-2 disabled:opacity-75 disabled:text-gray-400 btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl disabled:cursor-not-allowed disabled:border-gray-600"
            variant="info"
            disabled={
              !ownership_name ||
              !platform_name ||
              !format_name ||
              !status_name ||
              btnDisabled
            }
          >
            Guardar
          </Button>
          <Button
            type="button"
            className="disabled:opacity-75 disabled:text-gray-400 btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl disabled:cursor-not-allowed disabled:border-gray-600"
            variant="error"
            disabled={btnDisabled}
            onClick={() => navigate(`/games/${game.slug}`)}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </section>
  );
};
