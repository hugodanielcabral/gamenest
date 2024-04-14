export const scrollTo = (top = 0, behavior = "smooth") => {
  document.documentElement.scrollTo({ top, behavior });
};
