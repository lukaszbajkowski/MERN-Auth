import PropTypes from 'prop-types';
import {CheckIcon, XMarkIcon} from '@heroicons/react/20/solid';

const EmailSection = ({currentUser}) => {
    return (
        <>
            <div
                className={`col-start-1 md:col-end-${currentUser.googleAccount ? '7' : '5'} lg:col-end-${currentUser.googleAccount ? '7' : '6'} text-black text-start my-auto`}>
                <h1>Email</h1>
            </div>
            <div
                className={`col-start-1 md:col-start-${currentUser.googleAccount ? '7' : '5'} lg:col-start-${currentUser.googleAccount ? '7' : '6'} col-end-${currentUser.googleAccount ? '13' : '10'} flex flex-col my-auto`}>
                <div className="grid grid-cols-12">
                    <div className="col-start-1 col-end-13 break-all">
                        {currentUser.email}
                    </div>
                    <div className="col-start-1 col-end-13">
                        {currentUser.googleAccount ? (
                            <span className="flex text-green-700">
                                <CheckIcon className="h-5 w-5 my-auto me-1 text-green-700" aria-hidden="true"/>
                                Email confirmed via Google Account
                            </span>
                        ) : currentUser.emailConfirmed ? (
                            <span className="flex text-green-700">
                                <CheckIcon className="h-5 w-5 my-auto me-1 text-green-700" aria-hidden="true"/>
                                Email confirmed
                            </span>
                        ) : (
                            <span className="flex text-red-700">
                                <XMarkIcon className="h-5 w-5 my-auto me-1 text-red-700" aria-hidden="true"/>
                                Email not confirmed
                            </span>
                        )}
                    </div>
                </div>
            </div>
            {!currentUser.googleAccount && (
                <div className="col-start-10 col-end-13 my-auto flex justify-end">
                    <button
                        className="bg-slate-700 text-white rounded-lg py-3 px-6 capitalize shadow-md shadow-slate-700-50 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out hover:opacity-95 disabled:opacity-80 inline-block"
                        style={{minWidth: "fit-content"}}
                        onClick={() => {
                            window.location.href = "/change/email";
                        }}
                    >
                        Change
                    </button>
                </div>
            )}
        </>
    );
};

EmailSection.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default EmailSection;
