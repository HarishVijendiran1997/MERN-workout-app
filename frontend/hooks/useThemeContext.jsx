import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

export const useThemeContext = () => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error("useThemeContext must inside ThemeContextProvider")
    }

    return context
}