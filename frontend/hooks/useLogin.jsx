import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../src/utils/toastHelper";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        if (!navigator.onLine) {
            return toast.error("No internet connection! Please check your network");
        }
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user/login`, { email, password })
            localStorage.setItem("user", JSON.stringify(response.data))
            dispatch({ type: "LOGIN", payload: response.data })
            // toast.success(response?.data?.message || "Success");
            setTimeout(() => {
                showToast(response?.data?.message || "Login successful!", "info");
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.message || "Login failed")
        } finally {
            setIsLoading(false)
        }
    }

    return { login, error, isLoading }
}