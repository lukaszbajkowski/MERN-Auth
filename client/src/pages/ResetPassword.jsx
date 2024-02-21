import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();

  const navigate = useNavigate();
  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        throw new Error(data.message);
      }

      setTimeout(() => {
        navigate("/sign-in");
      }, 3000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <label>New Password:</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
      <p>{message}</p>
    </form>
  );
};

export default ResetPassword;
