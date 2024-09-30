import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../ui/button/Button";
import { PATCH } from "../../../../../services/apiServices";
import clsx from "clsx";

interface RatingProps {
  rating: number;
  gameSlug: string;
}

export const Rating = ({ rating, gameSlug }: RatingProps) => {
  const [currentRating, setCurrentRating] = useState<number>(rating || 0);
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

    toast.warning(`¿Calificar juego con ${newRating} estrellas?`, {
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
    <div className="rating md:rating-md rating-sm">
      {[0, 1, 2, 3, 4, 5].map((value) => {
        if (value === 0) return null;

        return (
          <input
            key={value}
            type="radio"
            name="rating-2"
            className={clsx(
              "mask mask-star-2 disabled:cursor-not-allowed disabled:bg-opacity-50",
              {
                "bg-gray-300 bg-opacity-50": currentRating === 0,
                "bg-yellow-400 bg-opacity-100": currentRating > 0,
              },
            )}
            checked={currentRating === value}
            onChange={() => handleOnRating(value)}
            disabled={isSending}
          />
        );
      })}
    </div>
  );
};
