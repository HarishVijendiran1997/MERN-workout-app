import React from 'react'
import { useTheme } from "../../contexts/ThemeContext"

export function ThemeBtn() {

    const { themeMode, toggleTheme } = useTheme()
    console.log(themeMode)
    return (
        <button
            onClick={toggleTheme}
            className="p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
        >
            {themeMode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
    )
}