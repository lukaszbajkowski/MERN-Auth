import PropTypes from 'prop-types';
import EmailSection from "../components/account/EmailSection.jsx";
import LoginSection from "../components/account/LoginSection.jsx";
import PasswordSection from "../components/account/PasswordSection.jsx";

const AccountForm = ({currentUser}) => {
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
                <div className="grid grid-cols-12 gap-4">
                    <PasswordSection
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    );
};

AccountForm.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default AccountForm;
