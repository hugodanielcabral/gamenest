//? Function to return the rating label based on the rating percentage
const ratingLabel = (ratingPercentage) => {
  if (ratingPercentage > 90) {
    return "Excelente";
  }

  if (ratingPercentage > 70) {
    return "Muy bueno";
  }
  if (ratingPercentage >= 40 && ratingPercentage <= 70) {
    return "Bueno";
  }

  if (ratingPercentage < 40) {
    return "Bajo";
  }

  return "Sin calificación";
};

export default ratingLabel;
