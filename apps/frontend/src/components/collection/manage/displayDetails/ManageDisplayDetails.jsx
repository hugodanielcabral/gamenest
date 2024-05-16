import { useForm } from "../../../../hooks/useForm.js";
import { DisplayDetailsGameInformation } from "./gameInformation/DisplayDetailsGameInformation";
import { DisplayDetailsProgress } from "./progress/DisplayDetailsProgress";
import { CardBackground } from "../../../ui/cardBackground/CardBackground";
import { Button, Toast } from "../../../ui";
import propTypes from "prop-types";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCollection } from "../../../../context/CollectionContext.jsx";
import { useEffect } from "react";

export const ManageDisplayDetails = ({ data, gameSlug }) => {
  const {
    platform,
    format,
    ownership,
    store,
    status,
    progress_note,
    handleOnChange,
    setFormData,
  } = useForm({
    platform: data.platforms[0].name,
    format: "Physical",
    ownership: "Owned",
    store: "Steam",
    status: "No status",
    progress_note: "",
  });

  const { pathname } = useLocation();

  const getActionType = pathname.includes("/update/");

  const { getGameFromCollection, addToCollection, updateGameFromCollection } =
    useCollection();
  const [errors, setErrors] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showToast, setShowToast] = useState(false);
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
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
          setButtonDisabled(false);
          navigate("/collection");
        }, 2000);

        return;
      }

      const response = await addToCollection(bodyData);

      if (!response.ok) {
        setErrors(response.statusText);
        setButtonDisabled(false);
      }

      const collectionData = await response.json();
      setButtonDisabled(true);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        setButtonDisabled(false);
        navigate("/collection");
      }, 2000);
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
      format: "Physical",
      ownership: "Owned",
      store: "Steam",
      status: "No status",
      progress_note: "",
    });
    navigate(`/games/${data.slug}`);
  };

  useEffect(() => {
    if (getActionType) {
      getGameFromCollection(data.slug).then((gameData) => {
        setFormData({
          platform: gameData.platform_name,
          format: gameData.format_name,
          ownership: gameData.ownership_name,
          store: gameData.store_name,
          status: gameData.status_name,
          progress_note: gameData.progress_note,
        });
      });
    }
  }, []);

  return (
    <section className="p-4 col-span-4">
      {showToast && (
        <Toast
          toastMessage={`${data?.name} ${
            getActionType ? "was updated" : "was added to your collection"
          }`}
          showToast={showToast}
        />
      )}

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
          <CardBackground className="p-4">
            <DisplayDetailsProgress
              status={status}
              progress_note={progress_note}
              handleOnChange={handleOnChange}
            />
          </CardBackground>
        </article>
        <article className="flex gap-4">
          <Button
            className="font-bold text-base md:text-lg uppercase disabled:bg-gray-400 disabled:cursor-not-allowed "
            type="submit"
            aria-label="Save changes"
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "Saving..." : "Save changes"}
          </Button>
          <Button
            className="font-bold md:text-lg uppercase bg-error hover:bg-error/80 text-base md:flex-grow-0 flex-grow disabled:bg-gray-400 disabled:cursor-not-allowed"
            type="reset"
            onClick={handleOnReset}
            aria-label="Cancel changes"
            disabled={buttonDisabled}
          >
            Cancel
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