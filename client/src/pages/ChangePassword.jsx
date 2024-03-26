import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import ChangePasswordModal from "../components/account/ChangePasswordModal.jsx";
import ChangePasswordForm from "../components/account/ChangePasswordForm.jsx";

const ChangePassword = ({
                            handleSubmit,
                            handleChange,
                            updateSuccess,
                            loading,
                            error,
                            currentPasswordField,
                            newPasswordField
                        }) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(updateSuccess);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowSuccessMessage(updateSuccess);
        if (updateSuccess) {
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
                closeModal();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [updateSuccess]);

    const closeModal = () => {
        setShowModal(false);
        window.location.href = '/account-settings';
    };

    return (
        <div className="p-3 max-w-2xl mx-auto">
            <div className="col-span-8 bg-slate-200 p-6 rounded-lg shadow-xl shadow-slate-200/50">
                <ChangePasswordForm
                    handleSubmit={(e) => {
                        handleSubmit(e);
                        setShowModal(true);
                    }}
                    handleChange={handleChange}
                    currentPasswordField={currentPasswordField}
                    newPasswordField={newPasswordField}
                />
            </div>
            {error && (
                <p className="text-sm text-red-700 px-6 pt-3 pb-2 md:pb-0 md:pt-3 leading-6">
                    {error.message}
                </p>
            )}
            <div className="flex justify-end">
                <button
                    className="bg-slate-700 text-white rounded-lg py-3 px-6 capitalize shadow-md
                            shadow-slate-700-50 transition duration-300 ease-in-out hover:transition hover:duration-300
                            hover:ease-in-out hover:opacity-95 disabled:opacity-80 me-6 mt-6"
                    disabled={loading}
                    onClick={(e) => {
                        handleSubmit(e);
                        setShowModal(true);
                    }}
                >
                    {loading ? 'Loading...' : 'Update'}
                </button>
            </div>
            {(showModal || error) && showSuccessMessage && (
                <ChangePasswordModal
                    showModal={showModal || error}
                    closeModal={closeModal}
                    showSuccessMessage={showSuccessMessage}
                    error={error}
                />
            )}
        </div>
    );
};

ChangePassword.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    updateSuccess: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    currentPasswordField: PropTypes.string.isRequired,
    newPasswordField: PropTypes.string.isRequired
};

export default ChangePassword;
