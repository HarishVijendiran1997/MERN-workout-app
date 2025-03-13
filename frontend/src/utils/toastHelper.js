import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message, type = "info", options = {}) => {
  if (window.innerWidth > 768) {
    toast[type](message, {
      autoClose: 2000,
      hideProgressBar: true,
      ...options,
    });
  }
};
