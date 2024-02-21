import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        body: JSON.stringify({ email }),
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
    <form onSubmit={handleResetRequest}>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
      <p>{message}</p>
    </form>
  );
};

export default ResetPasswordRequest;
