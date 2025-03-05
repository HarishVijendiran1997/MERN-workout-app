import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <header className="bg-blue-900 shadow-md">
            <div className="container mx-auto flex justify-between items-center p-6 text-white">
                <Link to='/' className="flex items-center space-x-2">
                    <h1 className="text-3xl font-bold" >Workout Planner</h1>
                </Link>
                <nav>

                    <ul className="flex space-x-4">
                        <li >
                            <Link to='/test' className="rounded-lg p-1.5 text-white bg-green-600 hover:bg-green-500 active:bg-green-600 font-semibold transition duration-200">
                                Workout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default NavBar