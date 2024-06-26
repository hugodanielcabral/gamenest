export const getTotalProgress = (progressObject: {
  [key: string]: number | undefined;
}) => {
  let total = 0;

  for (const progressKey in progressObject) {
    if (progressObject.hasOwnProperty(progressKey)) {
      total += parseInt(progressObject[progressKey]?.toString() ?? "0", 10);
    }
  }

  return total;
};
