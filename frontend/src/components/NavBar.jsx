import { Link } from "react-router-dom";
import { ThemeBtn } from "../components/ThemeBtn"
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const NavBar = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()

    return (
        <header className="bg-blue-900 dark:bg-darkTertiary shadow-md">
            <div className="container mx-auto flex justify-between items-center p-6 text-white">
                <Link to='/' className="flex items-center space-x-2">
                    <h1 className="dark:text-darkTextPrimary text-3xl font-bold" >Workout Planner</h1>
                </Link>
                <nav className="flex space-x-4">
                    {user && (
                        <div className="flex space-x-4">
                            <span className="text-lg dark:text-darkTextUser transition-colors duration-200">{user?.email}</span>
                            <button className="rounded-lg p-1.5 text-white bg-green-600 hover:bg-green-500 active:bg-green-600 dark:bg-darkTestButton dark:hover:bg-darkTestButtonHover dark:active:bg-darkTestButton dark:text-darkButtonText transition duration-200 cursor-pointer" onClick={logout}>Log out</button>
                        </div>)}
                    {!user && (
                        <div className="flex space-x-4">
                            <Link to='/login' className="rounded-lg p-1.5 text-white bg-green-600 hover:bg-green-500 active:bg-green-600 dark:bg-darkEditButton dark:hover:bg-darkEditButtonHover dark:active:bg-darkEditButton dark:text-darkButtonText transition duration-200 cursor-pointer">Login</Link>
                            <Link to='/signup' className="rounded-lg p-1.5 text-white bg-green-600 hover:bg-green-500 active:bg-green-600 dark:bg-darkSaveButton dark:hover:bg-darkSaveButtonHover dark:active:bg-darkSaveButton dark:text-darkButtonText transition duration-200 cursor-pointer">Signup</Link>
                        </div>)}
                    <div>
                        <ThemeBtn />
                    </div>
                    {/* <div >
                        <Link to='/test' className="rounded-lg p-1.5 text-white bg-green-600 hover:bg-green-500 active:bg-green-600 dark:bg-darkTestButton dark:hover:bg-darkTestButtonHover dark:active:bg-darkTestButton dark:text-darkButtonText font-semibold transition duration-200">
                            Workout
                        </Link>
                    </div> */}
                </nav>
            </div>
        </header>
    )
}

export default NavBar