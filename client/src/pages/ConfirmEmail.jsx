import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Confirmation = () => {
  const [message, setMessage] = useState("Confirmation in progress...");
  const { token } = useParams();

  useEffect(() => {
    fetch(`/api/auth/confirm-email/${token}`)
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Error confirming email:", error);
        setMessage("Error confirming email. Please try again.");
      });
  }, [token]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Email Confirmation
      </h1>
      <p>{message}</p>
      <div className="flex gap-3 mt-5">
        <p>Back to </p>
        <Link to={`/sign-in`}>
          <span className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">
            Sign In
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
