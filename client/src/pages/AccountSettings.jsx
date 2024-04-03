import {useState} from "react";
import PropTypes from "prop-types";
import EmailSection from "../components/account/EmailSection.jsx";
import LoginSection from "../components/account/LoginSection.jsx";
import PasswordSection from "../components/account/PasswordSection.jsx";
import DeleteAccountSection from "../components/account/DeleteAccountSection.jsx";
import RealNameInput from "../components/account/RealNameInput.jsx";
import GenderSelect from "../components/account/GenderSelect.jsx";
import DatePickerComponent from "../components/account/BDayPicker";

const AccountForm = ({currentUser, handleChange, handleSubmitUser, loadingProfileInfo}) => {
    const [selectedGender, setSelectedGender] = useState(currentUser.gender || "");
    const [birthdate, setBirthdate] = useState(currentUser.birthDate || new Date());

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
            {!currentUser.googleAccount && (
                <div className="col-span-8 bg-slate-200 p-6 mt-12 rounded-lg shadow-xl shadow-slate-200/50">
                    <div className="grid grid-cols-12 gap-4">
                        <PasswordSection currentUser={currentUser}/>
                    </div>
                </div>
            )}
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
};

export default AccountForm;
