export const capitalizeWord = (word: string, splitCond: string = "-") => {
  return word
    .split(splitCond)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
