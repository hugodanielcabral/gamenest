import { useState } from "react";
import { Icon } from "./ui/icon/Icon";
import { useDataFetch } from "../hooks/useDataFetch";
import clsx from "clsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface FetchData {
  fetchData: Boolean;
  isLoading: Boolean;
}

interface LikeButtonProps {
  likes: string;
  id?: number;
  url?: string;
  outline?: boolean;
}

export const LikeButton = ({ likes, id, url, outline = false }: LikeButtonProps) => {
  const [totalLikes, setTotalLikes] = useState(parseInt(likes));
  const [isSending, setIsSending] = useState(false);

  const {
    fetchData: hasLiked,
    isLoading,
    setFetchData,
  } = useDataFetch<FetchData["fetchData"]>(`${url}/${id}`);

  if (isLoading) {
    return null;
  }

  const handleLike = async () => {
    try {
      setIsSending(true);
      const response = await fetch(`${BASE_URL}/${url}/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });

      if (response.status === 201) {
        setTotalLikes(totalLikes + 1);
        setFetchData(true);
        setIsSending(false);
        return;
      }

      if (response.status === 204) {
        setTotalLikes(totalLikes - 1);
        setFetchData(false);
        setIsSending(false);
        return;
      }

      setIsSending(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    !isLoading && (
      <button
        onClick={handleLike}
        className={clsx(
          "flex items-center gap-1",
          hasLiked ? "text-red-500" : "text-gray-500",
          isSending && "cursor-not-allowed",
          outline && "btn-outline btn",
        )}
      >
        <Icon name={"icon-[material-symbols--favorite]"} className="size-6" />
        <span>{totalLikes}</span>
      </button>
    )
  );
};
