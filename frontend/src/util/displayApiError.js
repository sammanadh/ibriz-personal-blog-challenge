import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function displayApiError(errMsg) {
    toast.error(errMsg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}