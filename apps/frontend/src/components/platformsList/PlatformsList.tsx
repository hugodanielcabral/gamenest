import { useEffect, useState } from "react";
import { Badge } from "../ui/badge/Badge.tsx";
import type { IGDBPlatform } from "../../types/igdbGames.ts";

interface PlatformsListProps {
  platforms: IGDBPlatform[];
  initialVisible?: number;
  maxVisible?: number;
}

export const PlatformsList = ({
  platforms,
  initialVisible = 3,
  maxVisible = 8,
}: PlatformsListProps) => {
  const [visiblePlatforms, setVisiblePlatforms] =
    useState<number>(initialVisible);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width:720px)");

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setVisiblePlatforms(maxVisible);
      } else {
        setVisiblePlatforms(initialVisible);
      }
    };

    if (desktopMediaQuery.matches) {
      setVisiblePlatforms(maxVisible);
    } else {
      setVisiblePlatforms(initialVisible);
    }

    desktopMediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      desktopMediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const extraPlatforms = platforms.slice(visiblePlatforms);

  return (
    <ul className="mb-1 line-clamp-1 flex flex-wrap items-center gap-1 md:mb-4 md:gap-2">
      {platforms?.slice(0, visiblePlatforms).map(({ id, abbreviation }) => (
        <li key={id}>
          <Badge className="text-xs sm:text-sm">{abbreviation}</Badge>
        </li>
      ))}

      {extraPlatforms.length > 0 && (
        <span className="text-sm text-gray-300">
          ...{extraPlatforms.length} más
        </span>
      )}
    </ul>
  );
};
