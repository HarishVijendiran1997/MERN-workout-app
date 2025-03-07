import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

    const [themeMode, setThemeMode] = useState(localStorage.getItem("theme") || "light")

    const toggleTheme = () => {
        const newTheme = themeMode === "light"? "dark" : "light";
        setThemeMode(newTheme)
        localStorage.setItem("theme", newTheme);
    }
    useEffect(() => {
        const htmlElement = document.documentElement;
        htmlElement.classList.remove("dark", "light");
        htmlElement.classList.add(themeMode);
    }, [themeMode]);

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>)
}

export const useTheme = () => useContext(ThemeContext)
