import AboutUserTextarea from './AboutUserTextarea';
import CountrySelect from './CountrySelect';
import CitySelect from './CitySelect';
import PropTypes from 'prop-types';
import SettingSwitch from "../elements/SettingSwitch.jsx";

const UserForm = ({
                      currentUser,
                      handleChange,
                      countries,
                      selectedCountry,
                      handleCountryChange,
                      cities,
                      selectedCity,
                      handleCityChange,
                      loadingProfileInfo,
                      handleSubmitUser,
                      showCity,
                      handleShowCityChange,
                  }) => {
    return (
        <>
            <div className="col-span-8 bg-slate-200 p-6 rounded-b-lg shadow-xl shadow-slate-200/50 ">
                <div className="grid grid-cols-12 gap-4">
                    <AboutUserTextarea
                        aboutUser={currentUser.aboutUser}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            <div className="col-span-8 bg-slate-200 p-6 mt-12 rounded-t-lg shadow-xl shadow-slate-200/50">
                <div className="grid grid-cols-12 gap-4">
                    <CountrySelect
                        countries={countries}
                        selectedCountry={selectedCountry}
                        handleCountryChange={handleCountryChange}
                    />
                </div>
            </div>
            <div className="col-span-8 bg-white p-px"></div>
            <div className="col-span-8 bg-slate-200 p-6 shadow-xl shadow-slate-200/50">
                <div className="grid grid-cols-12 gap-4">
                    <CitySelect
                        cities={cities}
                        selectedCity={selectedCity}
                        handleCityChange={handleCityChange}
                        currentUserCity={currentUser.city}
                    />
                </div>
            </div>
            <div className="col-span-8 bg-white p-px"></div>
            <div className="col-span-8 bg-slate-200 p-6 shadow-xl shadow-slate-200/50">
                <div className="grid grid-cols-12 gap-4">
                    <SettingSwitch
                        label={`Show city in profile`}
                        checked={showCity}
                        onChange={handleShowCityChange}
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    className="bg-slate-700 text-white rounded-lg py-3 px-6 capitalize shadow-md shadow-slate-700-50
                    transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out
                    hover:opacity-95 disabled:opacity-80 me-6 mt-6"
                    disabled={loadingProfileInfo}
                    onClick={handleSubmitUser}
                >
                    {loadingProfileInfo ? 'Loading...' : 'Update'}
                </button>
            </div>
        </>
    );
};

UserForm.propTypes = {
    currentUser: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    countries: PropTypes.array.isRequired,
    selectedCountry: PropTypes.string.isRequired,
    handleCountryChange: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    selectedCity: PropTypes.string.isRequired,
    handleCityChange: PropTypes.func.isRequired,
    loadingProfileInfo: PropTypes.bool.isRequired,
    handleSubmitUser: PropTypes.func.isRequired,
    showCity: PropTypes.bool.isRequired,
    handleShowCityChange: PropTypes.func.isRequired,
};

export default UserForm;
