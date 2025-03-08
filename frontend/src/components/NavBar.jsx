import { Link } from "react-router-dom";
import { ThemeBtn } from "../components/ThemeBtn"

const NavBar = () => {

    return (
        <header className="bg-blue-900 dark:bg-darkTertiary shadow-md">
            <div className="container mx-auto flex justify-between items-center p-6 text-white">
                <Link to='/' className="flex items-center space-x-2">
                    <h1 className="dark:text-darkTextPrimary text-3xl font-bold" >Workout Planner</h1>
                </Link>
                <nav className="flex space-x-8">
                    <div>
                        <ThemeBtn />
                    </div>
                    <div className="flex space-x-8">
                            <Link to='/login'>Login</Link>
                            <Link to='/signup'>Signup</Link>
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