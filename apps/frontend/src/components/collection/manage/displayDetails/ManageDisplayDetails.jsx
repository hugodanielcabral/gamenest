import { useForm } from "../../../../hooks/useForm.js";
import { DisplayDetailsGameInformation } from "./gameInformation/DisplayDetailsGameInformation";
import { DisplayDetailsProgress } from "./progress/DisplayDetailsProgress";
import { Button } from "../../../ui";
import propTypes from "prop-types";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCollection } from "../../../../context/CollectionContext.jsx";
import { useEffect } from "react";
import { CardBackground } from "../../../ui/cardBackground/CardBackground.jsx";
import toast from "../../../../utils/toast.js";
import { DateTime } from "luxon";

export const ManageDisplayDetails = ({ data, gameSlug }) => {
  const {
    platform,
    format,
    ownership,
    store,
    status,
    progress_note,
    total_played,
    start_date,
    finish_date,
    amount_paid,
    handleOnChange,
    setFormData,
  } = useForm({
    platform: data.platforms[0].name,
    format: "Físico",
    ownership: "Comprado",
    store: "Steam",
    status: "Sin estado",
    progress_note: "",
    total_played: "",
    start_date: "",
    finish_date: "",
    amount_paid: "",
  });

  const { pathname } = useLocation();

  const getActionType = pathname.includes("/update/");

  const { getGameFromCollection, addToCollection, updateGameFromCollection } =
    useCollection();
  const [errors, setErrors] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const bodyData = {
    game_id: data.id,
    game_slug: data.slug,
    game_name: data.name,
    game_cover: data.cover.url,
    platform_name: platform,
    format_name: format,
    ownership_name: ownership,
    store_name: store,
    status_name: status,
    progress_note,
    total_played,
    start_date,
    finish_date,
    amount_paid,
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      setButtonDisabled(true);

      if (getActionType) {
        const response = await updateGameFromCollection(gameSlug, bodyData);

        if (!response.ok) {
          setErrors(response.statusText);
          setButtonDisabled(false);
        }

        const collectionData = await response.json();
        setButtonDisabled(true);
        toast(
          `${data?.name} fue actualizado correctamente`,
          "success",
          "#fff",
          "#00A7EA",
          "top",
        );

        setTimeout(() => {
          setButtonDisabled(false);
          navigate("/collection");
        }, 2000);

        return;
      } else {
        const response = await addToCollection(bodyData);

        if (!response.ok) {
          setErrors(response.statusText);
          setButtonDisabled(false);
        }

        const collectionData = await response.json();
        setButtonDisabled(true);
        toast(
          `${data?.name} fue agregado correctamente`,
          "success",
          "#fff",
          "#00A7EA",
          "top",
        );

        setTimeout(() => {
          setButtonDisabled(false);
          navigate("/collection");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setButtonDisabled(false);
    }
  };

  const handleOnReset = () => {
    setErrors(null);
    setButtonDisabled(false);
    setFormData({
      platform: data?.platforms[0].name,
      format: "Físico",
      ownership: "Comprado",
      store: "Steam",
      status: "Sin estado",
      progress_note: "",
      total_played: "",
      start_date: "",
      finish_date: "",
      amount_paid: "",
    });
    navigate(`/games/${data.slug}`);
  };

  useEffect(() => {
    if (getActionType) {
      getGameFromCollection(data.slug).then((gameData) => {
        const formattedStartDate = DateTime.fromISO(gameData.start_date, {
          zone: "utc",
        }).toISODate();

        const formattedFinishDate = DateTime.fromISO(gameData.finish_date, {
          zone: "utc",
        }).toISODate();

        setFormData({
          platform: gameData.platform_name,
          format: gameData.format_name,
          ownership: gameData.ownership_name,
          store: gameData.store_name,
          status: gameData.status_name,
          progress_note: gameData.progress_note,
          total_played: gameData.total_played,
          start_date: formattedStartDate || "",
          finish_date: formattedFinishDate || "",
          amount_paid: gameData.amount_paid,
        });
      });
    }
  }, [getActionType, data.slug]);

  return (
    <section className="col-span-4 p-4">
      <form className="space-y-6" onSubmit={handleOnSubmit}>
        <article>
          <CardBackground className="p-4">
            <DisplayDetailsGameInformation
              data={data}
              platform={platform}
              format={format}
              ownership={ownership}
              store={store}
              handleOnChange={handleOnChange}
            />
          </CardBackground>
        </article>
        <article>
          <CardBackground className="bg-base-300 p-4">
            <DisplayDetailsProgress
              status={status}
              progress_note={progress_note}
              handleOnChange={handleOnChange}
              total_played={total_played}
              start_date={start_date}
              finish_date={finish_date}
              amount_paid={amount_paid}
            />
          </CardBackground>
        </article>
        <article className="flex gap-4">
          <Button
            className="text-sm font-bold uppercase disabled:cursor-not-allowed disabled:bg-gray-400 md:text-lg"
            type="submit"
            aria-label="Save changes"
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "Guardando..." : "Guardar cambios"}
          </Button>
          <Button
            className="bg-error text-sm font-bold uppercase hover:bg-error/80 disabled:cursor-not-allowed disabled:bg-gray-400 md:flex-grow-0 md:text-lg"
            type="reset"
            onClick={handleOnReset}
            aria-label="Cancel changes"
            disabled={buttonDisabled}
          >
            Cancelar
          </Button>
        </article>
      </form>
    </section>
  );
};

ManageDisplayDetails.propTypes = {
  data: propTypes.object.isRequired,
  gameSlug: propTypes.string.isRequired,
};

ManageDisplayDetails.defaultProps = {
  data: {},
  gameSlug: "",
};
