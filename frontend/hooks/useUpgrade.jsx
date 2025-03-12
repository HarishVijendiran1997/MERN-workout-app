import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useUpgrade = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { user, dispatch } = useAuthContext()

    const upgrade = async (id, plan) => {
        if (!navigator.onLine) {
            return toast.error("No internet connection! Please check your network");
        }
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.patch(`http://localhost:4000/api/user/upgrade/${id}`, { plan }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            if (response.data) {
                const updatedUser = {
                    _id: response.data._id,
                    email: response.data.email,
                    token: response.data.token,
                    plan: response.data.plan,
                };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                dispatch({ type: "UPGRADE", payload: updatedUser });
                toast.success(response.data.message || "Upgraded to Premium account");
            } else {
                toast.error("Upgrade failed: No user data returned.");
            }
            setError(null)
        } catch (error) {
            toast.success(error.response?.data?.message || "Failed to upgrade to Premium account");
            setError(error.response?.data?.message || "Failed to upgrade to Premium account")
        } finally {
            setIsLoading(false)
        }
    }

    return { upgrade, error, isLoading }
}