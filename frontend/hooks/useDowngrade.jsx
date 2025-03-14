import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useDowngrade = () => {
    const [downgradeError, setDowngradeError] = useState(null)
    const [downgradeIsLoading, setDowngradeIsLoading] = useState(false)
    const { user, dispatch } = useAuthContext()

    const downgrade = async (id, plan) => {
        if (!navigator.onLine) {
            return toast.error("No internet connection! Please check your network");
        }
        setDowngradeIsLoading(true)
        setDowngradeError(null)
        try {
            const response = await axios.patch(`http://localhost:4000/api/user/downgrade/${id}`, { plan }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            if (response.data) {
                const updatedUser = {
                    _id: response.data._id,
                    fullName: response.data.fullName,
                    username: response.data.username,
                    email: response.data.email,
                    token: response.data.token,
                    plan: response.data.plan,
                };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                dispatch({ type: "DOWNGRADE", payload: updatedUser });
                toast.success(response.data.message || "Downgraded to Basic account");
            } else {
                toast.error("Downgrade failed: No user data returned.");
            }
            setDowngradeError(null)
        } catch (error) {
            toast.success(error.response?.data?.message || "Failed to downgrade to Basic account");
            setDowngradeError(error.response?.data?.message || "Failed to downgrade to Basic account")
        } finally {
            setDowngradeIsLoading(false)
        }
    }

    return { downgrade, downgradeError, downgradeIsLoading }
}