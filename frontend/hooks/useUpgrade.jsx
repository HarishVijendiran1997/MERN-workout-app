import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useUpgrade = () => {
    const [UpgradeError, setUpgradeError] = useState(null)
    const [UpgradeIsLoading, setUpgradeIsLoading] = useState(false)
    const { user, dispatch } = useAuthContext()

    const upgrade = async (id, plan) => {
        if (!navigator.onLine) {
            return toast.error("No internet connection! Please check your network");
        }
        setUpgradeIsLoading(true)
        setUpgradeError(null)
        try {
            const response = await axios.patch(`http://localhost:4000/api/user/upgrade/${id}`, { plan }, {
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
                dispatch({ type: "UPGRADE", payload: updatedUser });
                toast.success(response.data.message || "Upgraded to Premium account");
            } else {
                toast.error("Upgrade failed: No user data returned.");
            }
            setUpgradeError(null)
        } catch (error) {
            toast.success(error.response?.data?.message || "Failed to upgrade to Premium account");
            setUpgradeError(error.response?.data?.message || "Failed to upgrade to Premium account")
        } finally {
            setUpgradeIsLoading(false)
        }
    }

    return { upgrade, UpgradeError, UpgradeIsLoading }
}