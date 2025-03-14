import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        //merging similar cases
        case "LOGIN":
        case "UPGRADE":
        case "DOWNGRADE":
            return { user: action.payload }
            
        //merging similar cases
        case "LOGOUT":
        case "DELETE":
            return { user: null }

        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const localStoredUser = localStorage.getItem('user')
        if (localStoredUser) {
            try {
                const user = JSON.parse(localStoredUser);
                dispatch({ type: "LOGIN", payload: user });
            } catch (error) {
                localStorage.removeItem("user");
            }
        } else {
            dispatch({ type: "LOGOUT" })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}