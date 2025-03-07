import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

    const [themeMode, setThemeMode] = useState("light")

    const toggleTheme = () => {
        setThemeMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
        setTimeout(() => setThemeMode(prevTheme))
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
