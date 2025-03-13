import { useState } from "react";
import stylesForgotPassword from "../styles/login&signup.styles";
import { useResetPassword } from "../../hooks/useResetPassword";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPassword = () => {
    const { token } = useParams()
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPass, error, isLoading, resetOk, setResetOk, success, setSuccess } = useResetPassword();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        await resetPass(newPassword, confirmPassword, token);
    };

    const handleShowPassword = (e) => {
        setShowPassword(!showPassword);
    };

    const handleOk = () => {
        setResetOk(false)
        navigate('/login')
        setSuccess("")
    };

    return (
        <div className={stylesForgotPassword.page}>
            {/* Popup Box */}
            {resetOk && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-black/80 z-10">
                    <div className="sm:w-1/2 w-3/4 bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-lg transition-colors duration-200">
                        <h2 className="text-lg font-bold text-blue-900 dark:text-darkTextPrimary">Reset Password</h2>
                        <p className="text-lg my-5 font-semibold dark:text-darkTextSecondary transition-colors duration-200">{success}</p>
                        <button
                            onClick={handleOk}
                            className={`
                                px-5 bg-green-600 hover:bg-green-500 active:bg-green-600 cursor-pointer text-white p-2 rounded dark:text-ButtonText dark:bg-darkAddButton dark:hover:bg-darkAddButtonHover dark:active:bg-darkAddButton transition-colors duration-200`}>
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Reset Password Form */}
            {!resetOk && (
                <form onSubmit={handleSubmit} className={stylesForgotPassword.form}>
                    <h2 className={stylesForgotPassword.title}>Reset Password</h2>
                    <div className="flex flex-col gap-5">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                autoComplete="off"
                                className={stylesForgotPassword.password}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={stylesForgotPassword.passwordIcon}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </div>
                        <div className="relative min-w-sm">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="off"
                                className={stylesForgotPassword.password}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={stylesForgotPassword.passwordIcon}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </div>
                        <div className="flex items-center space-x-2 mb-5 px-2">
                            <label className="flex items-center space-x-2 px-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={handleShowPassword}
                                    className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-darkInputBackground dark:border-gray-600 dark:accent-darkEditButton`}
                                />
                                <span className="text-sm text-gray-600 dark:text-darkTextSecondary">
                                    Show password
                                </span>
                            </label>
                        </div>
                    </div>
                    <button
                        disabled={isLoading}
                        className={`w-full cursor-pointer ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-500 active:bg-green-600"
                            } text-white p-2 rounded transition-colors duration-200`}
                    >
                        {isLoading ? "Resetting password..." : "Reset Password"}
                    </button>
                    {error && <p className={stylesForgotPassword.errorMessage}>{error}</p>}
                </form>
            )}
        </div>
    );
};

export default ResetPassword;
