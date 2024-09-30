import { DateTime } from "luxon";

export const formatDate = (
    date: string,
    dateType: "short" | "med" | "huge" = "short",
  ) => {
    const dateTypes = {
      short: DateTime.DATE_SHORT,
      med: DateTime.DATE_MED,
      huge: DateTime.DATETIME_HUGE,
    };

    if (typeof date !== "string" && !date) return null;

    return DateTime.fromISO(date, {
      zone: "utc",
    }).toLocaleString(dateTypes[dateType]);
  };
