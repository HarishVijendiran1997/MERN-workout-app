import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../src/utils/toastHelper";
export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: dispatchWorkouts } = useWorkoutsContext();
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: "LOGOUT" });
        dispatchWorkouts({ type: "SET_WORKOUTS", payload: null });
        // toast.success("Logged out successfully");
        showToast("Logged out successfully", "info");

    }
    return { logout }
}