import PropTypes from 'prop-types';

const LoginSection = ({currentUser}) => {
    return (
        <>
            <div
                className={`col-start-1 md:col-end-${currentUser.googleAccount ? '7' : '5'} lg:col-end-${currentUser.googleAccount ? '7' : '6'} text-black text-start my-auto`}>
                <h1>Login</h1>
            </div>
            <div
                className={`col-start-1 md:col-start-${currentUser.googleAccount ? '7' : '5'} lg:col-start-${currentUser.googleAccount ? '7' : '6'} col-end-${currentUser.googleAccount ? '13' : '10'} flex flex-col my-auto`}>
                <div className="grid grid-cols-12">
                    <div className="col-start-1 col-end-13 break-all">
                        {currentUser.username}
                    </div>
                </div>
            </div>
            {!currentUser.googleAccount && (
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

LoginSection.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default LoginSection;
