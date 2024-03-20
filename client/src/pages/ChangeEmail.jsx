import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import ChangeEmailModal from "../components/account/ChangeEmailModal.jsx";
import ChangeEmailForm from "../components/account/ChangeEmailForm.jsx";

const ChangeEmail = ({
                         currentUser,
                         handleSubmit,
                         handleChange,
                         updateSuccess,
                         loading,
                         error,
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
    };

    return (
        <div className="p-3 max-w-2xl mx-auto">
            <div className="col-span-8 bg-slate-200 p-6 rounded-lg shadow-xl shadow-slate-200/50">
                <ChangeEmailForm
                    currentUser={currentUser}
                    handleSubmit={(e) => {
                        handleSubmit(e);
                        setShowModal(true);
                    }}
                    handleChange={handleChange}
                    loading={loading}
                />
            </div>
            <p className="text-xs font-light px-6 pt-3 pb-1 md:pb-0 md:pt-2 leading-6">
                To complete the process of changing your email address, we will send a confirmation request to your new
                address.
            </p>
            <div className="flex justify-end">
                <button
                    className="bg-slate-700 text-white rounded-lg py-3 px-6 capitalize shadow-md
                            shadow-slate-700-50 transition duration-300 ease-in-out hover:transition hover:duration-300
                            hover:ease-in-out hover:opacity-95 disabled:opacity-80 me-6"
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
                <ChangeEmailModal
                    showModal={showModal || error}
                    closeModal={closeModal}
                    showSuccessMessage={showSuccessMessage}
                    error={error}
                />
            )}
        </div>
    );
};

ChangeEmail.propTypes = {
    currentUser: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    updateSuccess: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default ChangeEmail;
