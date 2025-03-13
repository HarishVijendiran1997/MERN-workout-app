import { useState } from "react";
// import { useAuthContext } from "./useAuthContext"
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useForgotPassword = () => {
    const [error, setError] = useState(null)
    const [sentMail, setSentMail] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const[success, setSuccess] = useState("")
    // const { user, dispatch } = useAuthContext()

    const forgotPass = async (email) => {
        if (!email) {
            return toast.error("Please enter your email address");
        }
        setSentMail(false)
        if (!navigator.onLine) {
            return toast.error("No internet connection! Please check your network");
        }
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post(`http://localhost:4000/api/user/forgot-password/`, { email })
            if(response.status===200) {
                setSuccess(response.data?.message || "Check your email for password reset instructions");
                setSentMail(true)
                toast.success(response?.data?.message || "Check your email for password reset instructions");
            }
        } catch (error) {
            toast.success(error.response?.data?.message || "Failed to send password reset instructions");
            setError(error.response?.data?.message || "Failed to send link")
        } finally {
            setIsLoading(false)
        }
    }

    return { forgotPass, error, isLoading, sentMail, setSentMail, success, setSuccess}
}