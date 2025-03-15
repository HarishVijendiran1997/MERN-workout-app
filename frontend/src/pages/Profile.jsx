import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteAccountModel from "../components/DeleteAccountModel";
import NameEditor from "../components/NameEditor";

const Profile = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    console.log(user);
    const [fullName, setFullName] = useState(user?.fullName || "");
    const [username, setUsername] = useState(user?.username || "");

    return (
        <div className="flex w-full flex-col items-center justify-center bg-neutral-200 dark:bg-darkPrimary text-blue-900 dark:text-darkTextPrimary relative">
            <button className="text-white absolute top-5 left-5 cursor-pointer bg-blue-900 hover:bg-blue-950 dark:bg-darkTertiary dark:hover:bg-darkSecondary rounded-lg p-2"
                onClick={() => navigate("/")}>
                Back
            </button>
            <h1 className="text-3xl font-bold">Profile Page</h1>
            <div className="sm:w-1/2 flex justify-center">
                {user &&
                    <div>
                        {/* <p className="text-neutral-800 text-lg mt-4 dark:text-darkTextResult">
                            <strong className="dark:text-darkTextSecondary text-blue-900">FullName: </strong>{user.fullName}
                        </p> */}
                        {/* <p className="text-neutral-800 text-lg mt-4 dark:text-darkTextResult">
                            <strong className="dark:text-darkTextSecondary text-blue-900">Username: </strong>{user.username}
                            </p> */}
                        <NameEditor label="Full Name: " value={fullName} setValue={setFullName} />
                        <NameEditor label="Username: " value={username} setValue={setUsername} />
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
