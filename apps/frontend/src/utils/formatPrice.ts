export const formatPrice = (price: number | string) => {
  if (typeof price === "string") {
    price = parseFloat(price);
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  }

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);
};
