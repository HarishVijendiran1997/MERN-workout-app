import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteAccountModel from "../components/DeleteAccountModel";

const Profile = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <div className="flex w-full flex-col items-center justify-center bg-neutral-200 dark:bg-darkPrimary text-blue-900 dark:text-darkTextPrimary relative">
            <button className="text-white absolute top-5 left-5 cursor-pointer bg-blue-900 hover:bg-blue-950 dark:bg-darkTertiary dark:hover:bg-darkSecondary rounded-lg p-2"
                onClick={() => navigate("/")}>
                Back
            </button>
            <h1 className="text-3xl font-bold">Profile Page</h1>
            <div className="sm:w-1/3 flex px-10">
                {user &&
                    <div>
                        <p className="text-neutral-800 text-lg mt-4 dark:text-darkTextResult">
                            <strong className="dark:text-darkTextSecondary text-blue-900">Email: </strong>{user.email}
                        </p>
                        <div className="flex gap-2">
                            <p className="text-neutral-800 text-lg mt-4 dark:text-darkTextResult">
                                <strong className="dark:text-darkTextSecondary text-blue-900">Plan: </strong>{user.plan}
                            </p>
                            {user.plan === "Premium" && <FaCrown size={20} color="#FFA500" className="translate-y-5" />}
                        </div>
                        <p className="text-neutral-800 text-lg mt-4 dark:text-darkTextResult">
                            <strong className="dark:text-darkTextSecondary text-blue-900">ID: </strong>{user._id}
                        </p>
                        <button className="mt-4 delete-workout-btn text-white rounded-lg p-2 cursor-pointer bg-red-500 hover:bg-red-600 
                            dark:text-darkButtonText dark:bg-darkDeleteButton dark:hover:bg-darkDeleteButtonHover transition-colors duration-200"
                            onClick={() => {
                                console.log("Delete button clicked. Toggling isDeleting:", !isDeleting);
                                setIsDeleting(!isDeleting)
                            }}>
                            <strong>DELETE ACCOUNT</strong>
                        </button>
                    </div>
                }
            </div>
            <DeleteAccountModel isDeleting={isDeleting} setIsDeleting={setIsDeleting} />
        </div>
    );
};

export default Profile;
