import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordFailure, resetPasswordStart, resetPasswordSuccess } from "../redux/user/userSlice";

const ResetPasswordRequest = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [lastResetTime, setLastResetTime] = useState(null);
    const [resetCount, setResetCount] = useState(0);

    const { loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // Sprawdź liczbę prób i czas ostatniej próby zresetowania hasła
        const storedResetData = JSON.parse(localStorage.getItem("resetData")) || {};
        const { lastResetTime: storedLastResetTime, count: storedResetCount } = storedResetData;

        if (storedLastResetTime && Date.now() - storedLastResetTime < 300000) { // 300000 ms = 5 minut
            setLastResetTime(storedLastResetTime);
            setResetCount(storedResetCount);
        }
    }, []);

    const handleResetRequest = async (e) => {
        e.preventDefault();

        // Dodane - sprawdź, czy przekroczono limit prób
        if (resetCount >= 3) {
            setMessage("You have reached the maximum number of reset attempts. Please try again later.");
            return;
        }

        // Dodane - sprawdź, czy wystąpiło opóźnienie antyspamowe
        if (lastResetTime && Date.now() - lastResetTime < 30000) {
            setMessage("Please wait before trying again.");
            return;
        }

        try {
            dispatch(resetPasswordStart());
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(resetPasswordSuccess(data));
                setMessage(data.message);
                setLastResetTime(Date.now());
                setResetCount(resetCount + 1);

                // Zapisz dane do localStorage
                localStorage.setItem("resetData", JSON.stringify({
                    lastResetTime: Date.now(),
                    count: resetCount + 1,
                }));
            } else {
                dispatch(resetPasswordFailure(data));
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
