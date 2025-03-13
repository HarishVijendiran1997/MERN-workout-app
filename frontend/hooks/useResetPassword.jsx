import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useResetPassword = () => {
    const [error, setError] = useState(null);
    const [resetOk, setResetOk] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const resetPass = async (newPassword, confirmPassword, token) => {
        
        
        if (!navigator.onLine) {
            return toast.error("No internet connection! Please check your network.");
        }

        setIsLoading(true);
        setError(null);
        setResetOk(false);

        try {
            const response = await axios.patch(`http://localhost:4000/api/user/reset-password/`, {
                newPassword, 
                confirmPassword, 
                token
            });

            if (response.status === 200) {
                setSuccess(response.data?.message || "Password reset successful.");
                setResetOk(true);
                toast.success(response?.data?.message || "Password reset successful.");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || " to reset password.";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return { resetPass, error, isLoading, resetOk, setResetOk, success, setSuccess };
};