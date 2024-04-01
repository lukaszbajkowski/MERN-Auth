import {useState} from "react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {deleteUserSuccess} from "../redux/user/userSlice";
import DeleteAccountModal from "../components/account/DeleteAccountModal.jsx";
import DeleteAccountTextarea from "../components/account/DeleteAccountTextarea.jsx";

const DeleteAccount = ({
                           currentUser,
                           handleDeleteAccount,
                           loading,
                           error,
                       }) => {
    const [showModal, setShowModal] = useState(false);
    const [emailContent, setEmailContent] = useState("");
    const dispatch = useDispatch();

    const closeModal = () => {
        setShowModal(false);
        dispatch(deleteUserSuccess());
    };

    const handleDeleteAccountWithEmail = async () => {
        try {
            const commonFetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const deleteUserEmail = async (recipient, content) => {
                await fetch(`/api/user/delete/email`, {
                    ...commonFetchOptions,
                    body: JSON.stringify({
                        recipientEmail: recipient,
                        senderEmail: currentUser.email,
                        subject: "Powiadomienie o usunięciu konta",
                        content: content,
                    }),
                });
            };

            if (emailContent.trim() === "") {
                await deleteUserEmail(currentUser.email, "Konto zostało usunięte. Dziękujemy za skorzystanie z usługi MERN-Auth.");
            } else {
                await Promise.all([
                    deleteUserEmail("bajkowski1e@gmail.com", emailContent),
                    deleteUserEmail(currentUser.email, "Konto zostało usunięte. Dziękujemy za Twoją wiadomość dlaczego usunąłeś konto. Dziękujemy za skorzystanie z usługi MERN-Auth."),
                ]);
            }

            await handleDeleteAccount();
            setShowModal(true);
        } catch (error) {
            console.error("Error while sending email:", error);
        }
    };

    return (
        <div className="p-3 max-w-2xl mx-auto">
            <div className="col-span-8 bg-slate-200 p-6 rounded-lg shadow-xl shadow-slate-200/50">
                <div className="grid grid-cols-12 gap-4">
                    <DeleteAccountTextarea
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                    />
                </div>
            </div>
            <p className="text-xs font-light px-6 pt-3 pb-1 md:pb-0 md:pt-2 leading-6">
                If you delete your account, it will be deactivated immediately. Deactivated accounts are only visible to
                the MERN-Auth team before they are permanently deleted. Deletion takes place within the timeframe
                indicated in Privacy Policy.
            </p>
            <div className="flex justify-end mt-4">
                <button
                    className="bg-slate-700 text-white rounded-lg py-3 px-6 capitalize shadow-md
                            shadow-slate-700-50 transition duration-300 ease-in-out hover:transition hover:duration-300
                            hover:ease-in-out hover:opacity-95 disabled:opacity-80 me-6"
                    disabled={loading}
                    onClick={handleDeleteAccountWithEmail}
                >
                    {loading ? 'Loading...' : 'Delete'}
                </button>
            </div>
            {showModal && (
                <DeleteAccountModal
                    showModal={showModal || error}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

DeleteAccount.propTypes = {
    currentUser: PropTypes.object.isRequired,
    handleDeleteAccount: PropTypes.func.isRequired,
    updateSuccess: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default DeleteAccount;
