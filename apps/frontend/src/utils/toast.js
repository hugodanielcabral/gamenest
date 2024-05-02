import Swal from "sweetalert2";

const toast = (message, type, typeColor = "#fff") => {
  Swal.mixin({
    toast: true,
    position: "bottom",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: "#00A7EA",
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
