import { useState } from "react";
import { useAuthContext } from "./useAuthContext"
import axios from "axios";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post("http://localhost:4000/api/user/login", { email, password })
            localStorage.setItem("user", JSON.stringify(response.data))
            dispatch({ type: "LOGIN", payload: response.data })
        } catch (error) {
            setError(error.response?.data?.message || "Login failed")
        }finally{
            setIsLoading(false)
        }
    }

    return { login, error, isLoading }
}