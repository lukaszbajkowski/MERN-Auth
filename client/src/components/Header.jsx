import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import HeaderDropdown from "./HeaderDropdown";

export default function Header () {
    const {currentUser} = useSelector((state) => state.user);

    return (
        <div className="bg-slate-200">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to="/" className="my-auto">
                    <h1 className="font-bold text-3xl">Auth App</h1>
                </Link>
                <ul className="flex gap-4">
                    <Link to="/" className="my-auto">
                        <li>Home</li>
                    </Link>
                    <Link to="about" className="my-auto">
                        <li>About</li>
                    </Link>
                    <>
                        {currentUser ? (
                            <HeaderDropdown
                                currentUser={currentUser}
                            />
                        ) : (
                            <Link to="/sign-in" className="my-auto">
                                <li>Sign In</li>
                            </Link>
                        )}
                    </>

                </ul>
            </div>

        </div>
    );
}
