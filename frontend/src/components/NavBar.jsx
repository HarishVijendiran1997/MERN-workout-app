import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <header>
            <div className="bg-blue-900 flex justify-between items-center p-6  shadow-md text-white ">
                <Link to='/'>
                    <h1 className="text-3xl font-bold">Workout Planner</h1>
                </Link>
                <ul>
                    <li className="rounded-lg p-1.5 text-white bg-green-600 hover:bg-green-500 active:bg-green-600 font-semibold">
                        <Link to='/test'>TESTING</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default NavBar