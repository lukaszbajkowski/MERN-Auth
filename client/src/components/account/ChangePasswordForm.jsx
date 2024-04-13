import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/outline";

const ChangePasswordForm = ({
                                handleSubmit,
                                handleChange,
                                passwordField,
                                currentPasswordField,
                            }) => {
    const defaultErrors = [
        {text: "Password must be at least 8 characters long.", valid: false},
        {text: "Password must contain at least 1 uppercase letter.", valid: false},
        {text: "Password must contain at least 1 lowercase letter.", valid: false},
        {text: "Password must contain at least 1 number.", valid: false},
    ];

    const [passwordErrors, setPasswordErrors] = useState(defaultErrors);
    const [isCurrentPasswordEntered, setIsCurrentPasswordEntered] = useState(false);

    useEffect(() => {
        if (passwordField) {
            validatePassword(passwordField);
        }
    }, [passwordField]);

    const validatePassword = (password) => {
        const errors = [...defaultErrors];

        if (password.length >= 8) {
            errors[0].valid = true;
        }
        if (/[A-Z]/.test(password)) {
            errors[1].valid = true;
        }
        if (/[a-z]/.test(password)) {
            errors[2].valid = true;
        }
        if (/\d/.test(password)) {
            errors[3].valid = true;
        }

        setPasswordErrors(errors);
    };

    const handlePasswordChange = (e) => {
        handleChange(e);
        const newPassword = e.target.value;
        validatePassword(newPassword);
    };

    const handleCurrentPasswordChange = (e) => {
        handleChange(e);
        setIsCurrentPasswordEntered(!!e.target.value.trim());
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (
                    passwordErrors.every((error) => error.valid) &&
                    isCurrentPasswordEntered
                ) {
                    handleSubmit(e);
                }
            }}
            className="space-y-2 my-auto"
        >
            <h1 className="col-start-1 col-end-7 text-neutral-800 text-start">
                Current Password
            </h1>
            <div className="col-start-1 col-end-13 flex flex-col">
                <input
                    type="password"
                    id="currentPassword"
                    placeholder="Current Password"
                    value={currentPasswordField}
                    className="resize-none bg-slate-100 rounded-lg p-2.5 block w-full border border-gray-300
                            text-neutral-800 text-sm block w-full"
                    onChange={handleCurrentPasswordChange}
                />
            </div>
            <h1 className="col-start-1 col-end-7 text-neutral-800 text-start">
                New Password
            </h1>
            <div className="col-start-1 col-end-13 flex flex-col">
                <input
                    type="password"
                    id="password"
                    placeholder="New Password"
                    value={passwordField}
                    className="resize-none bg-slate-100 rounded-lg p-2.5 block w-full border border-gray-300
                            text-neutral-800 text-sm block w-full"
                    onChange={handlePasswordChange}
                />
                <div className="mt-4">
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
            </div>
        </form>
    );
};

ChangePasswordForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    passwordField: PropTypes.string.isRequired,
    currentPasswordField: PropTypes.string.isRequired,
};

export default ChangePasswordForm;
