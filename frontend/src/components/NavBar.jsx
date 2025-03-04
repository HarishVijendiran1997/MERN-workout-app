import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <header>
            <div className="bg-fuchsia-900 flex justify-between items-center p-4  shadow-md text-white ">
                <Link to='/'>
                    <h1 className="text-2xl font-bold">Workout Gang</h1>
                </Link>
                <ul>
                    <li className="rounded-lg bg-amber-500 p-1.5 text-black hover:bg-amber-400 font-semibold">
                        <Link to='/test'>TESTING</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default NavBar