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
import DeleteAccount from "./DeleteAccount.jsx";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import SecuritySettings from "./SecuritySettings.jsx";

export default function Profile () {
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const {currentUser, loading, error} = useSelector((state) => state.user);
    const [currentPasswordField, setCurrentPasswordField] = useState("");
    const [newPasswordField, setNewPasswordField] = useState("");
    const [loadingImage, setLoadingImage] = useState(false);
    const [loadingProfileInfo, setLoadingProfileInfo] = useState(false);
    const [loadingRelatedAccount, setLoadingRelatedAccount] = useState(false);
    const location = useLocation();
    const [showCity, setShowCity] = useState(currentUser.showCity);
    const [vacation, setVacation] = useState(currentUser.vacation);


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

            () => {
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
        const {id, value} = e.target;

        switch (id) {
            case "currentPassword":
                setCurrentPasswordField(value);
                break;
            case "newPassword":
                setNewPasswordField(value);
                break;
            default:
                break;
        }

        setFormData(prevState => ({...prevState, [id]: value}));
    };


    const handleShowCityChange = (checked) => {
        setShowCity(checked);
    };

    const handleVacationChange = (checked) => {
        setVacation(checked);
    };

    const updateEmail = async () => {
        try {
            const res = await fetch(`/api/user/update/email/${currentUser._id}`, {
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

            setTimeout(() => {
                setUpdateSuccess(false);
            }, 5000);
        } catch (error) {
            dispatch(updateUserFailure(error));
        }
    };

    const updateUsername = async () => {
        try {
            const res = await fetch(`/api/user/update/username/${currentUser._id}`, {
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

            setTimeout(() => {
                setUpdateSuccess(false);
            }, 5000);
        } catch (error) {
            dispatch(updateUserFailure(error));
        }
    };


    const updatePassword = async () => {
        try {
            const res = await fetch(`/api/user/update/password/${currentUser._id}`, {
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
            setCurrentPasswordField("");
            setNewPasswordField("");

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
                body: JSON.stringify({...formData, showCity, vacation}),
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

            setTimeout(() => {
                dispatch(deleteUserSuccess(data));
                deleteUserSuccess(false);
            }, 5000);
        } catch (error) {
            dispatch(deleteUserFailure(error));
        }
    };

    const relatedAccount = async () => {
        setLoadingRelatedAccount(true);
        dispatch(updateUserStart());
        try {
            const res = await fetch("/api/auth/check-related-account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: currentUser.email,
                }),
            });

            const data = await res.json();

            if (data.hasRelatedAccount) {
                await fetch("/api/auth/remove-related-account", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: currentUser.email,
                    }),
                });
                dispatch(updateUserSuccess({...currentUser, relatedAccount: ""}));
            } else {
                try {
                    const provider = new GoogleAuthProvider();
                    const auth = getAuth(app);

                    const result = await signInWithPopup(auth, provider);
                    await fetch("/api/auth/related-account", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: currentUser.email,
                            email: result.user.email,
                        }),
                    });
                    dispatch(updateUserSuccess({...currentUser, relatedAccount: result.user.email}));
                } catch (error) {
                    dispatch(updateUserFailure(error));
                    setLoadingRelatedAccount(false);
                }
            }
        } catch (error) {
            dispatch(updateUserFailure(error));
            setLoadingRelatedAccount(false);
        } finally {
            dispatch(updateUserFailure());
            setLoadingRelatedAccount(false);
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
                            handleChange={handleChange}
                            handleSubmitUser={handleSubmitUser}
                            loadingProfileInfo={loadingProfileInfo}
                            vacation={vacation}
                            handleVacationChange={handleVacationChange}
                            relatedAccount={relatedAccount}
                            loadingRelatedAccount={loadingRelatedAccount}
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
                        <SecuritySettings/>
                    </div>
                </>,
        },
        '/change/email': {
            content:
                <div className="row-span-3 md:col-span-12 p-4">
                    <ChangeEmail
                        currentUser={currentUser}
                        handleSubmit={updateEmail}
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
                        handleSubmit={updateUsername}
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
                        handleSubmit={updatePassword}
                        handleChange={handleChange}
                        updateSuccess={updateSuccess}
                        loading={loading}
                        error={error}
                        currentPasswordField={currentPasswordField}
                        newPasswordField={newPasswordField}
                    />
                </div>
            ,
        },
        '/delete/account': {
            content:
                <div className="row-span-3 md:col-span-12 p-4">
                    <DeleteAccount
                        currentUser={currentUser}
                        handleDeleteAccount={handleDeleteAccount}
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 m-4">
            {currentPathConfig.content}
        </div>
    );
}

