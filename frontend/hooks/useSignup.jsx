import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post("http://localhost:4000/api/user/signup",{email, password})
            localStorage.setItem("user", JSON.stringify(response.data))
            dispatch({ type: "LOGIN", payload: response.data })
            toast.success(response?.data?.message || "Success");
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed")
        }finally{
            setIsLoading(false)
        }
    }
    
    return { signup, error, isLoading }
}