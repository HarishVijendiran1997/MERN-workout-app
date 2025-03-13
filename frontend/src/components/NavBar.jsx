import { Link } from "react-router-dom";
import { ThemeBtn } from "../components/ThemeBtn"
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaCrown } from "react-icons/fa";

const NavBar = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()

    return (
        <header className="bg-blue-900 dark:bg-darkTertiary shadow-md relative">
            <div className="container mx-auto md:flex justify-between items-center p-4 md:p-6 text-white">
                <div className="flex justify-center space-x-2">
                    <div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className="dark:text-darkTextPrimary size-10"><path d="m826-585-56-56 30-31-128-128-31 30-57-57 30-31q23-23 57-22.5t57 23.5l129 129q23 23 23 56.5T857-615l-31 30ZM346-104q-23 23-56.5 23T233-104L104-233q-23-23-23-56.5t23-56.5l30-30 57 57-31 30 129 129 30-31 57 57-30 30Zm397-336 57-57-303-303-57 57 303 303ZM463-160l57-58-302-302-58 57 303 303Zm-6-234 110-109-64-64-109 110 63 63Zm63 290q-23 23-57 23t-57-23L104-406q-23-23-23-57t23-57l57-57q23-23 56.5-23t56.5 23l63 63 110-110-63-62q-23-23-23-57t23-57l57-57q23-23 56.5-23t56.5 23l303 303q23 23 23 56.5T857-441l-57 57q-23 23-57 23t-57-23l-62-63-110 110 63 63q23 23 23 56.5T577-161l-57 57Z" /></svg>
                        </div>
                    </div>
                    <div>
                        <Link to='/' className="flex items-center space-x-2">
                            <h1 className="dark:text-darkTextPrimary text-3xl font-bold" >Workout<span className="dark:text-darkTextSecondary text-4xl font-extrabold">X</span></h1>
                        </Link>
                    </div>
                </div>
                <nav className="flex md:flex-row md:space-x-2 mt-5 md:mt-0 text-center">
                    {user && (
                        <div className="flex gap-2 justify-between w-full">
                            <Link to="/profile">
                                <div className="flex gap-2">
                                    <div className="-translate-y-4">

                                        {user.plan === "Premium" ? (<FaCrown size={20} color="#FFA500" className="translate-y-5" />) : ""}
                                    </div>
                                    <div>

                                        <span id="user-email" className="hover:underline cursor-pointer text-lg dark:text-darkTextUser transition-colors duration-200">{user?.email}</span>
                                    </div>
                                </div>
                            </Link>
                            <div className="flex gap-2">
                                <div className="order-2">
                                    <button id="logout-btn" className={`rounded-lg p-1.5 text-white bg-green-600 hover:bg-green-500 active:bg-green-600 dark:bg-darkTestButton dark:hover:bg-darkTestButtonHover dark:active:bg-darkTestButton dark:text-darkButtonText transition duration-200 cursor-pointer`} onClick={logout}>Log out</button>
                                </div>
                                <div className="sm:order-3">
                                    <Link to="/plans">
                                        <button className={`rounded-lg p-1.5 text-white dark:text-darkButtonText bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 border-1 hover:bg-gradient-to-r hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 transition duration-800 cursor-pointer`} >{user.plan==="Premium"?"Basic Plan":"Upgrade Plan"}</button>
                                    </Link>
                                </div>
                            </div>
                        </div>)}
                    {!user && (
                        <div className="flex md:space-x-4 md:ml-0 ml-8 space-x-8 w-full justify-center ">
                            <Link to='/login' className={`rounded-lg p-1.5 text-white bg-green-600 hover:bg-green-500 active:bg-green-600 dark:bg-darkEditButton dark:hover:bg-darkEditButtonHover dark:active:bg-darkEditButton dark:text-darkButtonText transition duration-200 cursor-pointer`}>Login</Link>
                            <Link to='/signup' className={`rounded-lg p-1.5 text-white bg-green-600 hover:bg-green-500 active:bg-green-600 dark:bg-darkSaveButton dark:hover:bg-darkSaveButtonHover dark:active:bg-darkSaveButton dark:text-darkButtonText transition duration-200 cursor-pointer`}>Signup</Link>
                        </div>)}
                    <div className="md:static absolute right-4 top-4">
                        <ThemeBtn id="theme-toggle-btn" />
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default NavBar