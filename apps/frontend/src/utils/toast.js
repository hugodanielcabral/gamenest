import Swal from "sweetalert2";

const toast = (
  message,
  type,
  typeColor = "#fff",
  backgroundColor = "#00A7EA",
  position = "bottom"
) => {
  Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: backgroundColor,
    color: "#fff",
    width: "600px",
    iconColor: typeColor,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  }).fire({
    icon: type,
    title: message,
  });
};

export default toast;
