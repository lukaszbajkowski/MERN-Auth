import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetPasswordFailure, resetPasswordStart, resetPasswordSuccess} from "../redux/user/userSlice";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageStatus, setMessageStatus] = useState(null);
    const [isValidToken, setIsValidToken] = useState(false);
    const {token} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.user);

    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                dispatch(resetPasswordStart());
                const response = await fetch(`/api/auth/reset-password/${token}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({token}),
                });

                const data = await response.json();

                if (data.message === "Invalid or expired reset token.") {
                    dispatch(resetPasswordFailure(data));
                    navigate("/reset-password-error");
                } else {
                    dispatch(resetPasswordSuccess(data));
                    setIsValidToken(true);
                }
            } catch (error) {
                dispatch(resetPasswordFailure(error));
            }
        };

        checkTokenValidity();
    }, [token, navigate, dispatch]);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        setNewPassword("");

        try {
            dispatch(resetPasswordStart());
            const response = await fetch(`/api/auth/reset-password/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({newPassword, token}),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(resetPasswordSuccess(data));
                setMessage(data.message);
                setMessageStatus(true);

                setTimeout(() => {
                    navigate("/sign-in", {replace: true});
                }, 3000);
            } else {
                dispatch(resetPasswordFailure(data));
                throw new Error(data.message);
            }
        } catch (error) {
            setMessage(error.message);
            setMessageStatus(false);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            {isValidToken && (
                <>
                    <h1 className="text-3xl text-center font-semibold my-7">
                        Set up new password
                    </h1>
                    <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                        <input
                            placeholder="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="bg-slate-100 p-3 rounded-lg"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-slate-700 text-white p-3 rounded-lg capitalize hover:opacity-95 disabled:opacity-80"
                        >
                            {loading ? "Resetting Password..." : "Reset Password"}
                        </button>
                        <p className={messageStatus ? "text-green-700 mt-2" : "text-red-700 mt-2"}>
                            {message}
                        </p>
                    </form>
                </>
            )}
        </div>
    );
};

export default ResetPassword;
