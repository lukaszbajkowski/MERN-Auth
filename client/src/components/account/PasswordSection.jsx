import PropTypes from 'prop-types';

const PasswordSection = ({currentUser}) => {
    const isGoogleAccount = currentUser.googleAccount;
    const loginColClasses = isGoogleAccount ? "col-end-13" : "col-end-10";

    return (
        <>
            <div className={`col-start-1 ${loginColClasses} text-black text-start my-auto`}>
                <h1>Password</h1>
            </div>
            {!isGoogleAccount && (
                <div className="col-start-10 col-end-13 my-auto flex justify-end">
                    <button
                        className="bg-slate-700 text-white rounded-lg py-3 px-6 capitalize shadow-md shadow-slate-700-50 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out hover:opacity-95 disabled:opacity-80 inline-block"
                        style={{minWidth: "fit-content"}}
                        onClick={() => {
                            window.location.href = "/change/login";
                        }}
                    >
                        Change
                    </button>
                </div>
            )}
        </>
    );
};

PasswordSection.propTypes = {
    currentUser: PropTypes.shape({
        googleAccount: PropTypes.bool.isRequired,
        username: PropTypes.string.isRequired
    }).isRequired,
};

export default PasswordSection;
