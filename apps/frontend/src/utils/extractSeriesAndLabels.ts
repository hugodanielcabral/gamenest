interface ProfileStat {
  status_name: string;
  total: string | number;
}

export const extractSeriesAndLabels = (profileStats: ProfileStat[]) => {
  const profileStatsOptions = {
    labels: [],
    series: [],
  };

  for (const value of profileStats) {
    profileStatsOptions.labels.push(value.status_name);

    if (typeof value.total === "string") {
      let parsedValue = parseInt(value.total);
      profileStatsOptions.series.push(parsedValue);
    } else {
      profileStatsOptions.series.push(value.total);
    }
  }

  return {
    labels: profileStatsOptions.labels,
    series: profileStatsOptions.series,
  }
}