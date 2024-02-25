import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetPasswordFailure, resetPasswordStart, resetPasswordSuccess} from "../redux/user/userSlice";

const ResetPasswordRequest = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const {loading, error} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleResetRequest = async (e) => {
        e.preventDefault();

        try {
            dispatch(resetPasswordStart()); // Wysłanie akcji rozpoczęcia resetowania hasła
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email}),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(resetPasswordSuccess(data)); // Wysłanie akcji sukcesu resetowania hasła
                setMessage(data.message);
            } else {
                dispatch(resetPasswordFailure(data)); // Wysłanie akcji niepowodzenia resetowania hasła
                throw new Error(data.message);
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">
                Reset Password
            </h1>
            <form onSubmit={handleResetRequest} className="flex flex-col gap-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                    className="bg-slate-100 p-3 rounded-lg"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg capitalize hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "Loading..." : "Reset Password"}
                </button>
                <p className="text-green-700 mt-5">
                    {message}
                </p>
            </form>
            <p className="text-red-700 mt-5">
                {error ? error.message || "Something went wrong!" : ""}
            </p>
        </div>
    );
};

export default ResetPasswordRequest;
