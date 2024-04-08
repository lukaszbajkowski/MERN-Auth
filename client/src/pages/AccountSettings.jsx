import {useState} from "react";
import PropTypes from "prop-types";
import EmailSection from "../components/account/EmailSection.jsx";
import LoginSection from "../components/account/LoginSection.jsx";
import PasswordSection from "../components/account/PasswordSection.jsx";
import DeleteAccountSection from "../components/account/DeleteAccountSection.jsx";
import RealNameInput from "../components/account/RealNameInput.jsx";
import GenderSelect from "../components/account/GenderSelect.jsx";
import DatePickerComponent from "../components/account/BDayPicker";
import SettingSwitch from "../components/elements/SettingSwitch.jsx";
import RelatedAccount from "../components/account/RelatedAccoutButton";

const AccountForm = ({
                         currentUser,
                         handleChange,
                         handleSubmitUser,
                         loadingProfileInfo,
                         vacation,
                         handleVacationChange,
                         relatedAccount,
                         loadingRelatedAccount
                     }) => {
    const [selectedGender, setSelectedGender] = useState(currentUser.gender || "");
    const [birthdate, setBirthdate] = useState(currentUser.birthDate);

    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);
        handleChange(e);
    };

    const handleDateChange = (date) => {
        setBirthdate(date);
        handleChange({target: {id: "birthDate", value: date}});
    };

    return (
        <>
            <div className="col-span-8 bg-slate-200 p-6 rounded-t-lg shadow-xl shadow-slate-200/50">
                <div className="grid grid-cols-12 gap-4">
                    <LoginSection currentUser={currentUser}/>
                </div>
            </div>
            <div className="col-span-8 bg-white p-px"></div>
            <div className="col-span-8 bg-slate-200 p-6 rounded-b-lg shadow-xl shadow-slate-200/50">
                <div className="grid grid-cols-12 gap-4">
                    <EmailSection currentUser={currentUser}/>
                </div>
            </div>
            <form onSubmit={handleSubmitUser}>
                <div className="col-span-8 bg-slate-200 p-6 mt-12 rounded-t-lg shadow-xl shadow-slate-200/50 ">
                    <div className="grid grid-cols-12 gap-4">
                        <RealNameInput
                            name={currentUser.name}
                            handleChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-span-8 bg-white p-px"></div>
                <div className="col-span-8 bg-slate-200 p-6 rounded-b-lg shadow-xl shadow-slate-200/50 ">
                    <div className="grid grid-cols-12 gap-4">
                        <GenderSelect
                            selectedGender={selectedGender}
                            handleChange={handleGenderChange}
                        />
                    </div>
                </div>
                <div className="col-span-8 bg-white p-px"></div>
                <div className="col-span-8 bg-slate-200 p-6 rounded-b-lg shadow-xl shadow-slate-200/50 ">
                    <div className="grid grid-cols-12 gap-4">
                        <DatePickerComponent
                            selectedDate={birthdate}
                            handleChange={handleDateChange}
                        />
                    </div>
                </div>
                <div className="col-span-8 bg-slate-200 p-6 mt-12 rounded-lg shadow-xl shadow-slate-200/50">
                    <div className="grid grid-cols-12 gap-4">
                        <SettingSwitch
                            label={`Vacation mode`}
                            checked={vacation}
                            onChange={handleVacationChange}
                        />
                    </div>
                </div>
                {!currentUser.googleAccount && (
                    <>
                        <div className="col-span-8 bg-slate-200 p-6 mt-12 rounded-lg shadow-xl shadow-slate-200/50">
                            <div className="grid grid-cols-12 gap-4">
                                <RelatedAccount
                                    relatedAccount={relatedAccount}
                                    loadingRelatedAccount={loadingRelatedAccount}
                                    currentUser={currentUser}
                                />
                            </div>
                        </div>
                        <p className="text-xs font-light px-6 pt-3 pb-1 md:pb-0 md:pt-2 leading-6">
                            Link your accounts to be a verified user. By doing so, you will gain many benefits .
                        </p>
                        <div className="col-span-8 bg-slate-200 p-6 mt-12 rounded-lg shadow-xl shadow-slate-200/50">
                            <div className="grid grid-cols-12 gap-4">
                                <PasswordSection currentUser={currentUser}/>
                            </div>
                        </div>
                    </>
                )}
                <DeleteAccountSection currentUser={currentUser}/>
                <div className="flex justify-end">
                    <button
                        className="bg-slate-700 text-white rounded-lg py-3 px-6 capitalize shadow-md shadow-slate-700-50
                    transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out
                    hover:opacity-95 disabled:opacity-80 me-6 mt-6"
                        disabled={loadingProfileInfo}
                        onClick={handleSubmitUser}
                    >
                        {loadingProfileInfo ? "Loading..." : "Update"}
                    </button>
                </div>
            </form>
        </>
    );
};

AccountForm.propTypes = {
    currentUser: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    loadingProfileInfo: PropTypes.bool.isRequired,
    handleSubmitUser: PropTypes.func.isRequired,
    vacation: PropTypes.bool.isRequired,
    handleVacationChange: PropTypes.func.isRequired,
    loadingRelatedAccount: PropTypes.bool.isRequired,
    relatedAccount: PropTypes.func.isRequired,
};

export default AccountForm;
