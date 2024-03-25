import PropTypes from 'prop-types';
import EmailSection from "../components/account/EmailSection.jsx";
import LoginSection from "../components/account/LoginSection.jsx";

const AccountForm = ({currentUser, handleSubmit, handleChange, passwordField}) => {
    return (
        <>
            <div className="col-span-8 bg-slate-200 p-6 rounded-t-lg shadow-xl shadow-slate-200/50">
                <div className="grid grid-cols-12 gap-4">
                    <LoginSection
                        currentUser={currentUser}
                    />
                </div>
            </div>
            <div className="col-span-8 bg-white p-px"></div>
            <div className="col-span-8 bg-slate-200 p-6 shadow-xl shadow-slate-200/50">
                <div className="grid grid-cols-12 gap-4">
                    <EmailSection
                        currentUser={currentUser}
                    />
                </div>
            </div>
            <div className="col-span-8 bg-white p-px"></div>
            <div className="col-span-8 bg-slate-200 p-6 rounded-b-lg shadow-xl shadow-slate-200/50">
                <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
                    <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                        Password
                    </h1>
                    <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={passwordField}
                            className="resize-none bg-slate-100 rounded-lg p-2.5 block w-full border border-gray-300
                            text-gray-900 text-sm block w-full"
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

AccountForm.propTypes = {
    currentUser: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    passwordField: PropTypes.string.isRequired
};

export default AccountForm;
