import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: "LOGOUT" });
        toast.success("Logged out successfully");
    }
    return { logout }
}