import { useState, useEffect } from "react";

const displayModalWithoutLogout = (updateSuccess) => {
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

    return {
        showSuccessMessage,
        setShowSuccessMessage,
        showModal,
        setShowModal,
        closeModal
    };
};

export default displayModalWithoutLogout;
