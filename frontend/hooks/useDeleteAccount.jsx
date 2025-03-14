import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useDeleteAccount = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { user, dispatch } = useAuthContext()

    const deleteAcc = async () => {

        if (!user) {
            return toast.error("User authentication failed. Please log in again.");
        }

        if (!navigator.onLine) {
            return toast.error("You're offline! Check your internet connection and try again.");
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.delete(`http://localhost:4000/api/user/profile`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            if (response.status === 200) {
                dispatch({ type: "DELETE" });
                localStorage.removeItem("user");
                toast.success(response.data.message || "Your account has been deleted successfully. We’re sad to see you go! 😢");
            }
        } catch (error) {
            const errorMsg = (error.response?.data?.message || "Something went wrong. Please try again.")
            toast.error(errorMsg);
            setError(errorMsg);
        } finally {
            setIsLoading(false)
        }
    }

    return { deleteAcc, error, isLoading }
}