import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import axios from "axios";
import GoogleUserProfilePic from "../components/profile/GoogleUserProfilePic.jsx";
import UserProfilePic from "../components/profile/UserProfilePic.jsx";
import UserForm from "../components/profile/UserForm.jsx";

const ProfileForm = ({
                         currentUser,
                         formData,
                         setImage,
                         imageError,
                         imagePercent,
                         handleSubmitUser,
                         handleSubmitProfilePicture,
                         fileRef,
                         // loading,
                         handleChange,
                         loadingImage,
                         loadingProfileInfo,
                     }) => {

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countriesResponse = await axios.get("/api/country");
                setCountries(countriesResponse.data);

                const citiesResponse = await axios.get(`/api/country/${currentUser.country}`);
                setCities(citiesResponse.data);
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error);
            }
        };

        if (currentUser.country) {
            fetchData();
        }

        setSelectedCountry(currentUser.country);
        setSelectedCity(currentUser.city);
    }, [currentUser.country, currentUser.city]);


    const handleCountryChange = async (e) => {
        const selectedCountryValue = e.target.value;
        setSelectedCountry(selectedCountryValue);

        try {
            const citiesResponse = await axios.get(`/api/country/${selectedCountryValue}`);
            setCities(citiesResponse.data);
            handleChange(e);
        } catch (error) {
            console.error("Błąd podczas pobierania miast:", error);
        }
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        handleChange(e);
    };

    return (
        <>
            <div className="col-span-8 bg-slate-200 p-6 rounded-t-lg shadow-xl shadow-slate-200/50">
                <form onSubmit={handleSubmitProfilePicture} className="grid grid-cols-12 gap-4">
                    {currentUser.googleAccount ? (
                        <GoogleUserProfilePic currentUser={currentUser}/>
                    ) : (
                        <UserProfilePic
                            imageError={imageError}
                            imagePercent={imagePercent}
                            fileRef={fileRef}
                            setImage={setImage}
                            currentUser={currentUser}
                            formData={formData}
                            loadingImage={loadingImage}
                            handleFileClick={() => fileRef.current.click()}
                            handleSubmitProfilePicture={handleSubmitProfilePicture}
                        />
                    )}
                </form>
            </div>
            <div className="col-span-8 bg-white p-px"></div>
            <form onSubmit={handleSubmitUser}>
                <UserForm
                    currentUser={currentUser}
                    imageError={imageError}
                    imagePercent={imagePercent}
                    fileRef={fileRef}
                    setImage={setImage}
                    formData={formData}
                    loadingImage={loadingImage}
                    handleChange={handleChange}
                    countries={countries}
                    selectedCountry={selectedCountry}
                    handleCountryChange={handleCountryChange}
                    cities={cities}
                    selectedCity={selectedCity}
                    handleCityChange={handleCityChange}
                    loadingProfileInfo={loadingProfileInfo}
                    handleSubmitUser={handleSubmitUser}
                />
            </form>
        </>
    );
};

ProfileForm.propTypes = {
    currentUser: PropTypes.object.isRequired,
    formData: PropTypes.object.isRequired,
    setImage: PropTypes.func.isRequired,
    imageError: PropTypes.bool,
    imagePercent: PropTypes.number,
    handleSubmitUser: PropTypes.func.isRequired,
    handleSubmitProfilePicture: PropTypes.func.isRequired,
    fileRef: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    loadingImage: PropTypes.bool.isRequired,
    loadingProfileInfo: PropTypes.bool.isRequired,
    cities: PropTypes.array.isRequired,
};

export default ProfileForm;
