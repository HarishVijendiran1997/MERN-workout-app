import { useState } from "react"
import { Link } from "react-router-dom"
import { useLogin } from "../../hooks/useLogin"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }
    return (
        <div className="flex text-center bg-gray-200 dark:bg-darkPrimary w-full min-h-[calc(100vh-5.5rem)] pt-5 transition-colors duration-200">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto my-auto p-6 bg-white dark:bg-darkSecondary dark:text-darkInputText  shadow-md rounded-lg
transition-colors duration-200 py-10">
                <h2 className="text-2xl font-bold text-blue-600 dark:text-darkTextPrimary transition-colors duration-200 mb-8">Log in</h2>
                <div className="flex flex-col gap-2">
                    <div className="relative min-w-sm">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="w-full p-2 mb-4 border  rounded-lg placeholder:text-gray-500 dark:placeholder:text-darkTextPlaceholder dark:bg-darkInputBackground transition-colors duration-200" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute right-3 top-1/2 -translate-y-5 text-gray-500 dark:text-darkTextPlaceholder">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>

                    </div>
                    <div className="relative min-w-sm ">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className="w-full p-2 border  rounded-lg placeholder:text-gray-500 dark:placeholder:text-darkTextPlaceholder dark:bg-darkInputBackground transition-colors duration-200" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-darkTextPlaceholder">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center space-x-2 my-4 px-2">
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-darkInputBackground dark:border-gray-600 dark:accent-darkEditButton"
                    />
                    <label
                        htmlFor="showPassword"
                        className="text-sm text-gray-600 dark:text-darkTextSecondary cursor-pointer"
                    >
                        Show password
                    </label>
                </div>
                <button disabled={isLoading} className={`w-full ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-500 active:bg-green-600"} text-white p-2 rounded transition-colors duration-200`}>{isLoading ? "Logging in..." : "Login"}</button>
                {error && <p className="w-full p-2 mb-4 text-red-500 dark:text-errorText border bg-red-100 dark:bg-errorBackground rounded-lg mt-4 flex justify-center items-center transition-colors duration-200">{error}</p>}
                <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-darkTextSecondary">Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:text-blue-500 dark:text-accent-darkEditButton dark:hover:text-darkEditButtonHover">Sign up now</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login