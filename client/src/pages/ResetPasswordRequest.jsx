import {useState} from "react";
import {useNavigate} from "react-router-dom";

const ResetPasswordRequest = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const handleResetRequest = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email}),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
            } else {
                throw new Error(data.message);
            }

            setTimeout(() => {
                navigate("/reset-password-send");
            }, 3000);
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
                    className="bg-slate-700 text-white p-3 rounded-lg capitalize hover:opacity-95 disabled:opacity-80"
                >
                    Reset Password
                </button>
                <p className="text-green-700 mt-5">
                    {message}
                </p>
            </form>
        </div>
    );
};

export default ResetPasswordRequest;
