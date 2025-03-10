import { useState } from "react"
import { useSignup } from "../../hooks/useSignup"
import stylesSignup from "../styles/login&signup.styles"


const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }
    const handleShowPassword = (e) => {
        setShowPassword(!showPassword)
    }

    const handleOnChangeEmail = (e) => {
        const value = e.target.value
        setEmail(value)
    }
    const handleOnChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }

    //Sign up form styles
    const signupPageStyle = stylesSignup.page
    const signupFormStyle = stylesSignup.form
    const signupTitleStyle = stylesSignup.title
    const emailStyle = stylesSignup.email
    const emailIconStyle = stylesSignup.emailIcon
    const passwordStyle = stylesSignup.password
    const passwordIconStyle = stylesSignup.passwordIcon
    const showPasswordStyle = stylesSignup.showPassword
    const errorMessageStyle = stylesSignup.errorMessage
   
    //signup button style
    const signupButtonStyle = `w-full ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-500 active:bg-green-600"} text-white p-2 rounded transition-colors duration-200 cursor-pointer`


    return (
        <div className={signupPageStyle}>
            <form onSubmit={handleSubmit} className={signupFormStyle} disabled={isLoading}>
                <h2 className={signupTitleStyle}>Sign up</h2>
                <div className="flex flex-col gap-2">
                    <div className="relative min-w-sm">
                        <input type="email" placeholder="Email" value={email} onChange={handleOnChangeEmail} autoComplete="email" className={emailStyle} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={emailIconStyle}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>

                    </div>
                    <div className="relative min-w-sm ">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={handleOnChangePassword} autoComplete="current-password" className={passwordStyle} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={passwordIconStyle}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center space-x-2 my-4 px-2">
                    <label className="flex items-center space-x-2 px-2 cursor-pointer">
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={handleShowPassword}
                            className={showPasswordStyle}
                        />
                        <span className="text-sm text-gray-600 dark:text-darkTextSecondary">
                            Show password
                        </span>
                    </label>
                </div>
                <button className={signupButtonStyle}>{isLoading ? "Signing up..." : "Sign up"}</button>
                {error && <p className={errorMessageStyle}>{error}</p>}
            </form>
        </div>
    )
}

export default Signup