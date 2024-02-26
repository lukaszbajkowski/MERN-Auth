import {useDispatch} from "react-redux";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {app} from "../firebase";
import {loginSuccess} from "../redux/user/userSlice";
import {useState} from "react";

export default function OAuth () {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            const data = await res.json();

            if (!data.googleAccount) {
                setMessage("Email already exists")
                return;
            }

            dispatch(loginSuccess(data));
        } catch (error) {
            setMessage("Could not login with Google")
        }
    };


    return (
        <>
            <button
                type="button"
                onClick={handleGoogleClick}
                className="bg-red-700 text-white rounded-lg p-3 capitalize hover:opacity-90"
            >
                Continue with Google
            </button>
            {message && (
                <p className="text-red-700 mt-5">
                    {message || "Something went wrong!"}
                </p>
            )}
        </>
    );
}

