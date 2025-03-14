import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";

const DeleteAccountModel = ({ isDeleting, setIsDeleting }) => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
    const [isReady, setIsReady] = useState(false);
    const { deleteAcc, isLoading, error, isDeleted, setIsDeleted } = useDeleteAccount();

    useEffect(() => {
        if (isDeleting) {
            setCountdown(5);
            setIsReady(false);
        }
    }, [isDeleting]);

    useEffect(() => {
        if (isDeleting && countdown > 0) {
            const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (isDeleting && countdown === 0) {
            setIsReady(true);
        }
    }, [isDeleting, countdown]);

    const handleDelete = async () => {
        if (!user) {
            toast.error("You must be logged in to delete your account.");
            return;
        }
        localStorage.setItem("pendingDeletion", "true");
        setIsDeleted(true);
    };

    const handleOk = async () => {
        setIsDeleted(false);

        if (localStorage.getItem("pendingDeletion") === "true") {
            await deleteAcc();
            localStorage.removeItem("pendingDeletion");
            localStorage.removeItem("hasSeenGuide");
        }
        navigate('/signup');
    };

    const handleCancelDelete = () => {
        setIsDeleting(false);
        setIsReady(false);
        setCountdown(5);
    };

    useEffect(() => {
        if (localStorage.getItem("pendingDeletion") === "true") {
            deleteAcc().then(() => {
                localStorage.removeItem("pendingDeletion");
                localStorage.removeItem("hasSeenGuide");
                navigate('/signup');
            });
        }
    }, []);

    // // Fix: Ensure modal is hidden after deletion
    if (!isDeleting && !isDeleted) return null;

    return (
        <>
            {/* Delete Confirmation Modal */}
            {isDeleting && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-black/80 z-10">
                    <div className="bg-white sm:w-lg dark:bg-darkSecondary p-6 rounded-lg shadow-lg transition-colors duration-200">
                        <h2 className="text-center text-2xl font-bold text-blue-900 dark:text-darkTextPrimary">Confirm Delete Account</h2>
                        <p className="text-lg flex text-justify text-neutral-800 py-3 dark:text-darkTextResult transition-colors duration-200">
                            Are you sure you want to permanently delete your account? All your workouts will be lost, and this action cannot be undone.
                        </p>
                        <div className="flex justify-center md:justify-end space-x-4 mt-4">
                            <button onClick={handleCancelDelete}
                                className="px-4 py-2 text-white dark:text-darkCancelButtonText bg-gray-400 hover:bg-gray-500 dark:bg-darkCancelButton dark:hover:bg-darkCancelButtonHover rounded-lg cursor-pointer transition-colors duration-200">
                                Cancel
                            </button>
                            <button onClick={handleDelete} disabled={!isReady || isLoading}
                                className={`px-4 py-2 transition-colors duration-200 rounded-lg  
                                ${isReady && !isLoading
                                        ? "bg-red-500 text-white hover:bg-red-600 dark:bg-darkDeleteButton dark:hover:bg-darkDeleteButtonHover cursor-pointer"
                                        : "bg-neutral-600 w-[100px] text-white dark:text-darkButtonText dark:bg-darkDisabledText cursor-not-allowed"
                                    }`}>
                                {isLoading ? "Deleting" : isReady ? "Confirm" : countdown}
                            </button>
                        </div>
                        {error && <p className="w-full p-2 mb-4 text-red-500 dark:text-errorText border bg-red-100 dark:bg-errorBackground rounded-lg mt-4 flex justify-center items-center transition-colors duration-200">{error}</p>}
                    </div>
                </div>
            )}

            {/* After Deletion Confirmation Modal */}
            {isDeleted && (
                <div className="flex text-center bg-gray-200 dark:bg-darkPrimary w-full pt-5 transition-colors duration-200">
                    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/80 z-10">
                        <div className="sm:w-1/2 w-3/4 bg-white dark:bg-darkSecondary p-6 rounded-lg shadow-lg transition-colors duration-200">
                            <h2 className="text-2xl font-bold text-blue-900 dark:text-darkTextPrimary">Account Deleted</h2>
                            <p className="text-lg my-5 text-neutral-800 font-semibold dark:text-darkTextSecondary transition-colors duration-200">{"Your account has been deleted successfully. We are sad to see you go! :'("}</p>
                            <button
                                onClick={handleOk}
                                className={`px-5 bg-green-600 hover:bg-green-500 active:bg-green-600 cursor-pointer text-white p-2 rounded dark:text-ButtonText dark:bg-darkAddButton dark:hover:bg-darkAddButtonHover dark:active:bg-darkAddButton transition-colors duration-200`}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteAccountModel;
