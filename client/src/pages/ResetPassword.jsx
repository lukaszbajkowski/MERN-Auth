import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await fetch(`/api/auth/reset-password/${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.message === "Invalid or expired reset token.") {
          navigate("/reset-password-invalid-token", { replace: true });
        } else {
          setIsValidToken(true);
        }
      } catch (error) {
        console.error("Error checking token validity:", error);
      }
    };

    // Check token validity when component mounts
    checkTokenValidity();
  }, [token, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, token }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          navigate("/sign-in", { replace: true });
        }, 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setMessage(error.message);
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
              className="bg-slate-700 text-white p-3 rounded-lg capitalize hover:opacity-95 disabled:opacity-80"
            >
              Reset Password
            </button>
            <p className="text-green-700 mt-2">{message}</p>
          </form>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
