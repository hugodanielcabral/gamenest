//? Function to return the rating label based on the rating percentage
const ratingLabel = (ratingPercentage) => {
  if (ratingPercentage > 90) {
    return "Excellent";
  }

  if (ratingPercentage > 70) {
    return "Very Good";
  }
  if (ratingPercentage >= 40 && ratingPercentage <= 70) {
    return "Good";
  }

  if (ratingPercentage < 40) {
    return "Low";
  }

  return "No rating";
};

export default ratingLabel;
