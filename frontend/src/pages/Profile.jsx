import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    return (
        <div className="flex w-full flex-col items-center justify-center bg-neutral-200 dark:bg-darkPrimary text-blue-900 dark:text-darkTextPrimary relative">
            <button className="text-white absolute top-5 left-5 cursor-pointer bg-blue-900 hover:bg-blue-950 dark:bg-darkTertiary dark:hover:bg-darkSecondary rounded-lg p-2" onClick={()=>{navigate("/")}}>Back</button>
            <h1 className="text-3xl font-bold">Profile Page</h1>
            <div className="sm:w-1/3 flex px-10">
                {user &&
                    <div>
                        <p className="text-neutral-800 text-lg mt-4 dark:text-darkTextResult"><strong className="dark:text-darkTextSecondary text-blue-900">User Email: </strong>{user.email}</p>
                        <div className="flex gap-2">
                            <p className="text-neutral-800 text-lg mt-4 dark:text-darkTextResult"><strong className="dark:text-darkTextSecondary text-blue-900">User Plan: </strong>{user.plan}</p>{user.plan === "Premium" && (
                                <FaCrown size={20} color="#FFA500" className="translate-y-5" />
                            )}
                        </div>
                        <p className="text-neutral-800 text-lg mt-4 dark:text-darkTextResult"><strong className="dark:text-darkTextSecondary text-blue-900">User ID: </strong>{user._id}</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;
