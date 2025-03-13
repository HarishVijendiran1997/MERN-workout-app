import { useState } from "react";
import stylesForgotPassword from "../styles/login&signup.styles";
import { useForgotPassword } from "../../hooks/useForgotPassword";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { forgotPass, error, isLoading, sentMail, setSentMail, success, setSuccess } = useForgotPassword();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPass(email);
    };

    const handleOk = () => {
        setSentMail(false);
        navigate('/login')
        setSuccess("")
    };

    return (
        <div className={stylesForgotPassword.page}>
            {/* Popup Box */}
            {sentMail && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-black/80 z-10">
                    <div className="bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-lg transition-colors duration-200">
                        <h2 className="text-lg font-bold text-blue-900 dark:text-darkTextPrimary">Please check your email!</h2>
                        <p className="text-lg my-5 font-semibold dark:text-darkTextSecondary transition-colors duration-200">{success}</p>
                        <button
                            onClick={handleOk}
                            className={`
                                px-5 bg-green-500 hover:bg-green-600 active:bg-green-500 cursor-pointer text-white p-2 rounded dark:text-ButtonText dark:bg-darkAddButton dark:hover:bg-darkAddButtonHover dark:active:bg-darkAddButton transition-colors duration-200`}>
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Forgot Password Form */}
            {!sentMail && (
                <form onSubmit={handleSubmit} className={stylesForgotPassword.form}>
                    <h2 className={stylesForgotPassword.title}>Forgot Password</h2>
                    <div className="flex flex-col gap-2">
                        <div className="relative min-w-sm">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                className={stylesForgotPassword.email}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className={stylesForgotPassword.emailIcon}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                />
                            </svg>
                        </div>
                    </div>
                    <button
                        disabled={isLoading}
                        className={`w-full ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-500 active:bg-green-600"
                            } text-white p-2 rounded transition-colors duration-200`}
                    >
                        {isLoading ? "Sending reset link..." : "Send reset link"}
                    </button>
                    {error && <p className={stylesForgotPassword.errorMessage}>{error}</p>}
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;
