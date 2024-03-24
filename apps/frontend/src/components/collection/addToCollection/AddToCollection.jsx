import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch.js";
import { useForm } from "../../../hooks/useForm.js";
import { Button, Loading, Toast } from "../../ui/index.js";
import { AddToCollectionHeader } from "./sections/AddToCollectionHeader.jsx";
import { AddToCollectionGameInfo } from "./sections/AddToCollectionGameInfo.jsx";
import { AddToCollectionProgress } from "./sections/AddToCollectionProgress.jsx";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AddToCollection = () => {
  const { gameSlug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useFetch(`${BASE_URL}/games/${gameSlug}`);
  const { formData, setFormData, handleOnChange } = useForm({
    platform: "",
    ownership: "Owned",
    status: "No status",
    progressNotes: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      setButtonDisabled(true);

      const response = await fetch(`${BASE_URL}/collection`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({
          game_id: data[0]?.id,
          platform: formData.platform,
          ownership: formData.ownership,
          status: formData.status,
          progress: "yep",
          progress_note: formData.progressNotes,
        }),
      });

      const collectionData = await response.json();

      if (!response.ok) {
        setErrors(collectionData.errors);
        setButtonDisabled(false);
        throw new Error(
          collectionData.errors
            ? collectionData.errors[0].msg
            : "An error occurred"
        );
      }

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

  const handleCancel = () => {
    setFormData({
      platform: "",
      ownership: "Owned",
      status: "No status",
      progressNotes: "",
    });
    setButtonDisabled(false);
    navigate(`/games/${gameSlug}`);
  };

  return isLoading ? (
    <div className="mx-auto">
      <Loading />
    </div>
  ) : (
    <div
      className="p-4 min-h-[100vh] bg-no-repeat bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 90%), url(${
          data
            ? data[0].screenshots[0].url.replace("t_thumb", "t_screenshot_huge")
            : null
        })`,
      }}
    >
      <Toast
        message={`${data[0].name} was successfully added to your collection!`}
        showToast={showToast}
      />

      <form
        onSubmit={handleOnSubmit}
        className="grid grid-cols-2 max-w-[1100px] mx-auto mt-10 gap-2"
      >
        <AddToCollectionHeader data={data} gameSlug={gameSlug} />
        <AddToCollectionGameInfo
          data={data}
          formData={formData}
          handleOnChange={handleOnChange}
          errors={errors}
        />
        <AddToCollectionProgress
          formData={formData}
          handleOnChange={handleOnChange}
          errors={errors}
        />

        <section className="flex gap-5">
          <Button
            type="submit"
            disabled={buttonDisabled}
            className="bg-buttons-500 hover:bg-buttons-400 font-bold text-textWhite-50 text-lg disabled:pointer-events-none disabled:opacity-50"
          >
            Add to collection
          </Button>
          <Button
            type="button"
            disabled={buttonDisabled}
            className="bg-danger-500 hover:bg-danger-400 font-bold text-textWhite-50 text-lg disabled:pointer-events-none disabled:opacity-50"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </section>
      </form>
    </div>
  );
};
