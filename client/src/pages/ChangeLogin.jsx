import PropTypes from "prop-types";
import ChangeLoginForm from "../components/account/ChangeLoginForm.jsx";
import ChangeLoginModal from "../components/account/ChangeLoginModal.jsx";
import displayModalWithoutLogout from "../components/account/displayModalWithoutLogout.jsx";

const ChangeLogin = ({
                         currentUser,
                         handleSubmit,
                         handleChange,
                         updateSuccess,
                         loading,
                         error,
                     }) => {
    const {
        showSuccessMessage,
        showModal,
        setShowModal,
        closeModal
    } = displayModalWithoutLogout(updateSuccess);

    return (
        <div className="p-3 max-w-2xl mx-auto">
            <div className="col-span-8 bg-slate-200 p-6 rounded-lg shadow-xl shadow-slate-200/50">
                <ChangeLoginForm
                    currentUser={currentUser}
                    handleSubmit={(e) => {
                        handleSubmit(e);
                        setShowModal(true);
                    }}
                    handleChange={handleChange}
                    loading={loading}
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
                <ChangeLoginModal
                    showModal={showModal || error}
                    closeModal={closeModal}
                    showSuccessMessage={showSuccessMessage}
                    error={error}
                />
            )}
        </div>
    );
};

ChangeLogin.propTypes = {
    currentUser: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    updateSuccess: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default ChangeLogin;
