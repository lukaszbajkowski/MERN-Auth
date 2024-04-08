import PropTypes from "prop-types";

const RelatedAccount = ({relatedAccount, loadingRelatedAccount, currentUser}) => {
    return (
        <>
            <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                Google
            </h1>
            <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col ms-auto my-auto">
                    <button
                        type="button"
                        onClick={relatedAccount}
                        className={`bg-slate-700 text-white rounded-lg py-3 px-6 capitalize shadow-md shadow-slate-700-50 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out hover:opacity-95 ${loadingRelatedAccount ? 'opacity-80 pointer-events-none' : ''} inline-block`}
                    >
                        {loadingRelatedAccount ? 'Ładowanie...' : currentUser.relatedAccount ? 'Rozłącz konto' : 'Połącz konto'}
                    </button>
                </div>
            </div>
        </>
    );
};

RelatedAccount.propTypes = {
    relatedAccount: PropTypes.func.isRequired,
    loadingRelatedAccount: PropTypes.bool.isRequired,
    currentUser: PropTypes.shape({
        relatedAccount: PropTypes.string.isRequired
    }).isRequired
};
export default RelatedAccount;
