import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";

const Profile = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [isReady, setIsReady] = useState(false);
    const { deleteAcc, isLoading, error } = useDeleteAccount()

    const deleteMode = () => {
        setIsDeleting(true)
        setCountdown(5);
        setIsReady(false);
    }

    const cancelDeleteMode = () => setIsDeleting(false)

    useEffect(() => {
        if (isDeleting && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsReady(true);
        }
    }, [isDeleting, countdown]);

    const handleDelete = async () => {
        if (!user) {
            toast.error("You must be logged in to delete your account.");
            return;
        }
        await deleteAcc()
        navigate("/signup")
    }

    return (
        <div className="flex w-full flex-col items-center justify-center bg-neutral-200 dark:bg-darkPrimary text-blue-900 dark:text-darkTextPrimary relative">
            <button className="text-white absolute top-5 left-5 cursor-pointer bg-blue-900 hover:bg-blue-950 dark:bg-darkTertiary dark:hover:bg-darkSecondary rounded-lg p-2" onClick={() => { navigate("/") }}>Back</button>
            <h1 className="text-3xl font-bold">Profile Page</h1>
            <div className="sm:w-1/3 flex px-10">
                {user && !isDeleting &&
                    <div>
                        <div>
                            <p className="text-neutral-800 text-lg mt-4 dark:text-darkTextResult"><strong className="dark:text-darkTextSecondary text-blue-900">Email: </strong>{user.email}</p>
                            <div className="flex gap-2">
                                <p className="text-neutral-800 text-lg mt-4 dark:text-darkTextResult"><strong className="dark:text-darkTextSecondary text-blue-900">Plan: </strong>{user.plan}</p>{user.plan === "Premium" && (
                                    <FaCrown size={20} color="#FFA500" className="translate-y-5" />
                                )}
                            </div>
                            <p className="text-neutral-800 text-lg mt-4 dark:text-darkTextResult"><strong className="dark:text-darkTextSecondary text-blue-900">ID: </strong>{user._id}</p>
                        </div>
                        <div>
                            <button className={`mt-4 delete-workout-btn text-white rounded-lg p-2 cursor-pointer bg-red-500 hover:bg-red-600 
            dark:text-darkButtonText dark:bg-darkDeleteButton dark:hover:bg-darkDeleteButtonHover 
            transition-colors duration-200 `} onClick={deleteMode}><strong>DELETE ACCOUNT</strong></button>
                        </div>
                    </div>
                }
                {isDeleting && (
                    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-black/80 z-10">
                        <div className="bg-white sm:w-lg dark:bg-darkSecondary p-6 rounded-lg shadow-lg transition-colors duration-200">
                            <h2 className="text-center text-2xl font-bold text-blue-900 dark:text-darkTextPrimary">Delete Account</h2>
                            <p className="text-lg flex text-justify  text-neutral-800 py-3 dark:text-darkTextResult transition-colors duration-200">
                                Are you sure you want to permanently delete your account? All your workouts will be lost, and this action cannot be undone.
                            </p>
                            <div className="flex justify-center md:justify-end space-x-4 mt-4">
                                <button onClick={cancelDeleteMode}
                                    className={`px-4 py-2 text-white dark:text-darkCancelButtonText bg-gray-400 hover:bg-gray-500 dark:bg-darkCancelButton dark:hover:bg-darkCancelButtonHover rounded-lg cursor-pointer transition-colors duration-200`}>
                                    Cancel
                                </button>
                                <button onClick={handleDelete} disabled={!isReady || isLoading}
                                    className={`px-4 py-2 transition-colors duration-200 rounded-lg  
                                        ${isReady || isLoading
                                            ? "bg-red-500 text-white hover:bg-red-600 dark:bg-darkDeleteButton dark:hover:bg-darkDeleteButtonHover cursor-pointer"
                                            : "bg-neutral-600 w-[100px] text-white dark:text-darkButtonText dark:bg-darkDisabledText cursor-not-allowed"
                                        }`}>
                                    {isLoading ? "Deleting" : isReady ? "Confirm" : countdown}
                                </button>
                                {error && <p className={`w-full p-2 mb-4 text-red-500 dark:text-errorText border bg-red-100 dark:bg-errorBackground rounded-lg mt-4 flex justify-center items-center transition-colors duration-200`}>{error}</p>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Profile;
