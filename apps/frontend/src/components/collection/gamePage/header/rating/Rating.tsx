import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../ui/button/Button";
import { PATCH } from "../../../../../services/apiServices";

interface RatingProps {
  rating: number;
  gameSlug: string;
}

export const Rating = ({ rating, gameSlug }: RatingProps) => {
  const [currentRating, setCurrentRating] = useState<number>(rating || 1);
  const [isSending, setIsSending] = useState(false);

  const updateRating = async (newRating: number) => {
    setIsSending(true);
    try {
      const response = await PATCH(`/collection/update/game/${gameSlug}`, {
        rating: newRating,
      });

      if (!response) {
        setIsSending(false);
        toast.error("Ocurrió un error al actualizar la información del juego", {
          duration: 3000,
          className:
            "bg-error text-white text-xs md:text-sm text-white font-nunito",
        });
        return console.error("Error");
      }

      setIsSending(false);
      setCurrentRating(newRating);
      toast.success(
        `¡Se ha actualizado la calificación del juego a ${newRating} estrellas!`,
        {
          duration: 3000,
          className: `bg-success text-white text-xs md:text-sm text-white font-nunito`,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnRating = (newRating: number) => {
    if (newRating === currentRating) {
      return;
    }

    toast.warning("¿Estás seguro de que deseas cambiar la calificación?", {
      duration: 4000,
      className: `bg-neutral text-xs md:text-sm text-white font-nunito`,
      action: (
        <>
          <Button
            className="btn-info text-white"
            size="sm"
            onClick={() => {
              updateRating(newRating);
              toast.dismiss();
            }}
          >
            Sí
          </Button>
          <Button
            className="btn-error text-white"
            size="sm"
            onClick={() => {
              toast.dismiss();
            }}
          >
            No
          </Button>
        </>
      ),
    });
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <input
          key={value}
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-orange-400 disabled:cursor-not-allowed disabled:bg-opacity-50"
          checked={currentRating === value}
          onChange={() => handleOnRating(value)}
          disabled={isSending}
        />
      ))}
    </div>
  );
};
