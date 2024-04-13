import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import OAuth from "../components/OAuth";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/outline";

const SignUp = () => {
    const [formData, setFormData] = useState({});
    const [passwordErrors, setPasswordErrors] = useState([
        {text: "Password must be at least 8 characters long.", valid: false},
        {text: "Password must contain at least 1 uppercase letter.", valid: false},
        {text: "Password must contain at least 1 lowercase letter.", valid: false},
        {text: "Password must contain at least 1 number.", valid: false},
    ]);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isValid = passwordErrors.every((error) => error.valid);
        setIsPasswordValid(isValid);
    }, [passwordErrors]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
        if (e.target.id === "password") {
            validatePassword(e.target.value);
        }
    };

    const validatePassword = (password) => {
        const errors = [...passwordErrors];

        if (password.length >= 8) {
            errors[0].valid = true;
        } else {
            errors[0].valid = false;
        }
        if (/[A-Z]/.test(password)) {
            errors[1].valid = true;
        } else {
            errors[1].valid = false;
        }
        if (/[a-z]/.test(password)) {
            errors[2].valid = true;
        } else {
            errors[2].valid = false;
        }
        if (/\d/.test(password)) {
            errors[3].valid = true;
        } else {
            errors[3].valid = false;
        }

        setPasswordErrors(errors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isPasswordValid) {
            setError("Password must meet all criteria.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
                return;
            }
            navigate("/sign-in");
        } catch (error) {
            setLoading(false);
            setError("Something went wrong");
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={handleChange}
                    className="resize-none bg-slate-100 rounded-lg p-2.5 block w-full border border-gray-300
                            text-neutral-800 text-sm block w-full"
                />
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    onChange={handleChange}
                    className="resize-none bg-slate-100 rounded-lg p-2.5 block w-full border border-gray-300
                            text-neutral-800 text-sm block w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                    className="resize-none bg-slate-100 rounded-lg p-2.5 block w-full border border-gray-300
                            text-neutral-800 text-sm block w-full"
                />
                <div className="mt-2 mb-2">
                    {passwordErrors.map((error, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            {error.valid ? (
                                <CheckIcon className="h-5 w-5 text-green-700"/>
                            ) : (
                                <XMarkIcon className="h-5 w-5 text-red-700"/>
                            )}
                            <p className={`text-sm text-neutral-700`}>{error.text}</p>
                        </div>
                    ))}
                </div>
                <button
                    disabled={loading}
                    className="bg-slate-700 text-white p-3 rounded-lg capitalize hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? "Loading..." : "Sign Up"}
                </button>
                <OAuth/>
            </form>
            <p className="text-red-700 mt-5">{error}</p>
            <div className="flex mt-12">
                <div className="mx-auto flex gap-2">
                    <p>Have an account?</p>
                    <Link to={`/sign-in`}>
                        <span className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">
                          Sign in
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
