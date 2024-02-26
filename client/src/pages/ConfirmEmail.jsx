import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

const Confirmation = () => {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const {token} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await fetch(`/api/auth/confirm-email/${token}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({token})
                });

                const data = await response.json();

                if (response.ok) {
                    setMessage(data.message);

                    setTimeout(() => {
                        navigate("/sign-in", {replace: true});
                    }, 3000);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        confirmEmail();
    }, [token, navigate]);

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">
                Email Confirmation
            </h1>
            {error ? (
                <p className="text-red-700 mt-2">
                    {error}
                </p>
            ) : (
                <p className="text-green-700 mt-2">
                    {message}
                </p>
            )}
            <div className="flex gap-3 mt-5">
                <p>Back to </p>
                <Link to="/sign-in">
                    <span className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">
                        Sign In
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Confirmation;
