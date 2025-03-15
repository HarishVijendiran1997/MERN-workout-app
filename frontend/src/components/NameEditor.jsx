import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const NameEditor = ({ label, value, setValue }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [tempValue, setTempValue] = useState(value)
    const { user } = useAuthContext();

    const handleSave = () => {
        setValue(tempValue);
        setIsEditing(false);
    }

    return (
        <div className="flex justify-between items-center mt-4">
            {isEditing ? (
                <div className="flex">
                    <div>
                        <strong className="dark:text-darkTextSecondary text-blue-900 text-lg font-bold">{label}</strong>
                    </div>
                    <div>
                        <p className="text-neutral-800 text-lg dark:text-darkTextResult">
                            <input
                                type="text"
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                className="bg-gray-300 p-1 ml-1 rounded-lg dark:text-darkTextPrimary outline-none"
                            />
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                            className={`edit-fullName-btn rounded-lg transition-all duration-200 p-1.5 ml-2 text-neutral-200 active:bg-blue-500 hover:bg-blue-600 bg-blue-500 cursor-pointer dark:text-darkButtonText dark:bg-darkEditButton dark:hover:bg-darkEditButtonHover`}
                        >
                            {isEditing ? "Save" : ""}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex">
                    <div>
                        <p className="text-neutral-800 text-lg dark:text-darkTextResult">
                            <strong className="dark:text-darkTextSecondary text-blue-900">{label}</strong>
                            {value}
                        </p>
                    </div>
                    {!isEditing && (<svg onClick={() => (isEditing ? handleSave() : setIsEditing(true))} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`edit-fullName-btn rounded-lg transition-all duration-200 size-6 hover:scale-110 ml-2 text-neutral-700 hover:text-neutral-500 cursor-pointer dark:hover:text-darkEditButtonHover dark:text-darkButtonText`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>)}


                </div>
            )}
        </div>
    );
}

export default NameEditor;