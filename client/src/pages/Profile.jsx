import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable,} from "firebase/storage";
import {app} from "../firebase";
import {
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
} from "../redux/user/userSlice";
import SettingNavigation from "../components/SettingNavigation";
import {useLocation} from "react-router-dom";
import ProfileForm from "./ProfileSettings.jsx";
import AccountForm from "./AccountSettings.jsx";
import ChangeEmail from "./ChangeEmail.jsx";
import ChangeLogin from "./ChangeLogin.jsx";
import ChangePassword from "./ChangePassword.jsx";

export default function Profile () {
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const {currentUser, loading, error} = useSelector((state) => state.user);
    const [passwordField, setPasswordField] = useState("");
    const [loadingImage, setLoadingImage] = useState(false);
    const [loadingProfileInfo, setLoadingProfileInfo] = useState(false);
    const location = useLocation();
    const [showCity, setShowCity] = useState(currentUser.showCity);

    useEffect(() => {
        if (image) {
            handleFileUpload(image);
        }
    }, [image]);

    const handleFileUpload = async (image) => {
        setLoadingImage(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",

            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(Math.round(progress));
            },

            (error) => {
                setImageError(true);
                setLoadingImage(false);
            },

            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({...formData, profilePicture: downloadURL});
                    setLoadingImage(false);
                });
            }
        );
    };

    const handleChange = (e) => {
        if (e.target.id === "password") {
            setPasswordField(e.target.value);
        }

        setFormData({...formData, [e.target.id]: e.target.value});
    };

    const handleShowCityChange = (checked) => {
        setShowCity(checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());

            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success === false) {
                dispatch(updateUserFailure(data));
                return;
            }

            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
            setPasswordField("");

            setTimeout(() => {
                setUpdateSuccess(false);
            }, 5000);
        } catch (error) {
            dispatch(updateUserFailure(error));
        }
    };

    const handleSubmitUser = async (e) => {
        e.preventDefault();
        try {
            setLoadingProfileInfo(true);
            dispatch(updateUserStart());

            const res = await fetch(`/api/user/update/about/${currentUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...formData, showCity}),
            });

            const data = await res.json();

            if (data.success === false) {
                dispatch(updateUserFailure(data));
                setLoadingProfileInfo(false);
                return;
            }

            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
            setLoadingProfileInfo(false);
        } catch (error) {
            dispatch(updateUserFailure(error));
            setLoadingProfileInfo(false);
        }
    };

    const handleSubmitProfilePicture = async (e) => {
        e.preventDefault();
        try {
            setLoadingImage(true);
            dispatch(updateUserStart());

            const res = await fetch(`/api/user/update/image/${currentUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success === false) {
                dispatch(updateUserFailure(data));
                setLoadingImage(false);
                return;
            }

            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
            setLoadingImage(false);
        } catch (error) {
            dispatch(updateUserFailure(error));
            setLoadingImage(false);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error));
        }
    };

    const pathConfig = {
        '/profile': {
            content:
                <>
                    <div className="row-span-3 md:col-span-4 p-4 pb-0">
                        <SettingNavigation/>
                    </div>
                    <div className="row-span-3 md:col-span-8 p-4">
                        <ProfileForm
                            currentUser={currentUser}
                            formData={formData}
                            setImage={setImage}
                            imageError={imageError}
                            imagePercent={imagePercent}
                            handleSubmitUser={handleSubmitUser}
                            handleSubmitProfilePicture={handleSubmitProfilePicture}
                            fileRef={fileRef}
                            loadingImage={loadingImage}
                            loadingProfileInfo={loadingProfileInfo}
                            handleChange={handleChange}
                            handleShowCityChange={handleShowCityChange}
                            showCity={showCity}
                        />
                    </div>
                </>
            ,
        },
        '/account-settings': {
            content:
                <>
                    <div className="row-span-3 md:col-span-4 p-4 pb-0">
                        <SettingNavigation/>
                    </div>
                    <div className="row-span-3 md:col-span-8 p-4">
                        <AccountForm
                            currentUser={currentUser}
                        />
                    </div>
                </>,
        },
        '/security-settings': {
            content:
                <>
                    <div className="row-span-3 md:col-span-4 p-4 pb-0">
                        <SettingNavigation/>
                    </div>
                    <div className="row-span-3 md:col-span-8 p-4">
                        <div className="col-span-8 bg-blue-500">6</div>
                    </div>
                </>
            ,
        },
        '/change/email': {
            content:
                <div className="row-span-3 md:col-span-12 p-4">
                    <ChangeEmail
                        currentUser={currentUser}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        updateSuccess={updateSuccess}
                        loading={loading}
                        error={error}
                    />
                </div>
            ,
        },
        '/change/login': {
            content:
                <div className="row-span-3 md:col-span-12 p-4">
                    <ChangeLogin
                        currentUser={currentUser}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        updateSuccess={updateSuccess}
                        loading={loading}
                        error={error}
                    />
                </div>
            ,
        },
        '/change/password': {
            content:
                <div className="row-span-3 md:col-span-12 p-4">
                    <ChangePassword
                        currentUser={currentUser}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        updateSuccess={updateSuccess}
                        loading={loading}
                        error={error}
                    />
                </div>
            ,
        }
    };

    const currentPath = location.pathname;
    const currentPathConfig = pathConfig[currentPath] || pathConfig['/default'];

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 m-4">
                {currentPathConfig.content}
            </div>
            <span
                onClick={handleDeleteAccount}
                className="text-red-700 cursor-pointer"
            >
              Delete Account
            </span>
            {/*<div className="p-3 max-w-lg mx-auto">*/}
            {/*    <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>*/}
            {/*    <form onSubmit={handleSubmit} className="flex flex-col gap-4">*/}
            {/*        <input*/}
            {/*            defaultValue={currentUser.username}*/}
            {/*            type="text"*/}
            {/*            id="username"*/}
            {/*            placeholder="Username"*/}
            {/*            className="bg-slate-100 rounded-lg p-3"*/}
            {/*            onChange={handleChange}*/}
            {/*            disabled={currentUser.googleAccount}*/}
            {/*        />*/}
            {/*        <input*/}
            {/*            defaultValue={currentUser.email}*/}
            {/*            type="email"*/}
            {/*            id="email"*/}
            {/*            placeholder="Email"*/}
            {/*            className="bg-slate-100 rounded-lg p-3"*/}
            {/*            onChange={handleChange}*/}
            {/*            disabled={currentUser.googleAccount}*/}
            {/*        />*/}
            {/*        {currentUser.googleAccount ? (*/}
            {/*            ""*/}
            {/*        ) : (*/}
            {/*            <input*/}
            {/*                type="password"*/}
            {/*                id="password"*/}
            {/*                placeholder="Password"*/}
            {/*                value={passwordField}*/}
            {/*                className="bg-slate-100 rounded-lg p-3"*/}
            {/*                onChange={handleChange}*/}
            {/*                disabled={currentUser.googleAccount}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*        <button*/}
            {/*            className="bg-slate-700 text-white rounded-lg p-3 capitalize hover:opacity-95 disabled:opacity-80"*/}
            {/*            disabled={currentUser.googleAccount}*/}
            {/*        >*/}
            {/*            {loading ? "Loading..." : "Update"}*/}
            {/*        </button>*/}
            {/*    </form>*/}
            {/*    <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>*/}
            {/*    <p className="text-green-700 mt-5">*/}
            {/*        {updateSuccess && "User is updated successfully!"}*/}
            {/*    </p>*/}
            {/*</div>*/}
        </>
    );
}

