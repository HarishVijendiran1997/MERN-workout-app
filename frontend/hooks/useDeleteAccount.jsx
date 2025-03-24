import { useState, useMemo } from "react";
import { useAuthContext } from "./useAuthContext"
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useDeleteAccount = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { user, dispatch } = useAuthContext()
    const [isDeleted, setIsDeleted] = useState(false)

    const headers = useMemo(() => ({
            Authorization: `Bearer ${user.token}`
        }), [user])

    const deleteAcc = async () => {

        if (!user) {
            return toast.error("User authentication failed. Please log in again.");
        }

        if (!navigator.onLine) {
            return toast.error("You're offline! Check your internet connection and try again.");
        }

        setIsLoading(true)
        setError(null)
        setIsDeleted(false)

        try {
            const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/profile`, {
                headers
            })
            if (response.status === 200) {
                dispatch({ type: "DELETE" });
                setIsDeleted(true);
                localStorage.removeItem("user");
                toast.success(response.data.message || "Your account has been deleted successfully.");
            }

        } catch (error) {
            const errorMsg = (error.response?.data?.message || "Something went wrong. Please try again.")
            toast.error(errorMsg);
            setError(errorMsg);
        } finally {
            setIsLoading(false)
        }
    }

    return { deleteAcc, error, isLoading, isDeleted, setIsDeleted }
}