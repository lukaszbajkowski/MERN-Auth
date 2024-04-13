import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {loginFailure, loginStart, loginSuccess,} from "../redux/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn () {
    const [formData, setFormData] = useState({});
    const {loading, error} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(loginStart());
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success === false) {
                dispatch(loginFailure(data));
                return;
            }

            dispatch(loginSuccess(data));
            navigate("/");
        } catch (error) {
            dispatch(loginFailure(error));
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    onChange={handleChange}
                    className="bg-slate-100 p-3 rounded-lg"
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                    className="bg-slate-100 p-3 rounded-lg"
                />
                <div className="flex gap-3">
                    <Link to={`/reset-password`}>
                        <span className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">
                            Forgot a password?
                        </span>
                    </Link>
                </div>
                <button
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg capitalize hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "Loading..." : "Sign In"}
                </button>
                <OAuth/>
                {error && (
                    <p className="text-red-700 mt-5">
                        {error.message || "Something went wrong!"}
                    </p>
                )}
            </form>
            <div className="flex mt-12">
                <div className="mx-auto flex gap-2">
                    <p>Don't have an account?</p>
                    <Link to={`/sign-up`}>
                        <span className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">
                            Sign Up
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
