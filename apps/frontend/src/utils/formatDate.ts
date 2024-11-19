import { DateTime } from "luxon";

export const formatDate = (
  date: string | null | undefined,
  dateType: "short" | "med" | "huge" | "input" = "short"
) => {
  const dateTypes = {
    short: DateTime.DATE_SHORT,
    med: DateTime.DATE_MED,
    huge: DateTime.DATETIME_HUGE,
  };

  if (!date || date.trim() === "") return null;

  const parsedDate = DateTime.fromISO(date, { zone: "utc" });

  if (!parsedDate.isValid) return null;

  if (dateType === "input") {
    return parsedDate.toFormat("yyyy-MM-dd");
  }

  return parsedDate.toLocaleString(dateTypes[dateType]);
};
