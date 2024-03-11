import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable,} from "firebase/storage";
import {app} from "../firebase";
import {
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOut,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
} from "../redux/user/userSlice";
import SettingNavigation from "../components/SettingNavigation";
import {useLocation} from "react-router-dom";
import ProfileForm from "./ProfileSettings.jsx";

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
                body: JSON.stringify(formData),
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

    const handleSignOut = async () => {
        try {
            await fetch("/api/auth/signout");
            dispatch(signOut());
        } catch (error) {
            console.log(error);
        }
    };

    const pathConfig = {
        '/profile': {
            content:
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
                    />,
        },
        '/account-settings': {
            content: <div className="col-span-8 bg-blue-500">4</div>,
        },
        '/security-settings': {
            content: <div className="col-span-8 bg-blue-500">6</div>,
        },
    };

    const currentPath = location.pathname;
    const currentPathConfig = pathConfig[currentPath] || pathConfig['/default'];


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 m-4">
                <div className="row-span-3 md:col-span-4 p-4 pb-0">
                    <SettingNavigation/>
                </div>
                <div className="row-span-3 md:col-span-8 p-4">
                    {currentPathConfig.content}
                </div>
            </div>
                 <span
              onClick={handleDeleteAccount}
              className="text-red-700 cursor-pointer"
            >
              Delete Account
            </span>
            <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
              Loggout
            </span>
        </>
        // <div className="p-3 max-w-lg mx-auto">
        //   <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        //   <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        //     {currentUser.googleAccount ? (
        //       <div className="h-24 w-24 self-center mt-2">
        //         {currentUser.profilePicture && (
        //           <img
        //             src={currentUser.profilePicture}
        //             alt="profilePicture"
        //             className="h-full w-full rounded-full object-cover"
        //           />
        //         )}
        //       </div>
        //     ) : (
        //       <>
        //         <input
        //           type="file"
        //           ref={fileRef}
        //           hidden
        //           accept="image/*"
        //           onChange={(e) => setImage(e.target.files[0])}
        //           disabled={currentUser.googleAccount}
        //         />
        //         <img
        //           src={formData.profilePicture || currentUser.profilePicture}
        //           alt="profilePicture"
        //           className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
        //           onClick={() => fileRef.current.click()}
        //           disabled={currentUser.googleAccount}
        //         />
        //       </>
        //     )}
        //     <p className="text-sm self-center">
        //       {imageError ? (
        //         <span className="text-red-700">
        //           Error uploading image (file size must be less than 5 MB)
        //         </span>
        //       ) : imagePercent > 0 && imagePercent < 100 ? (
        //         <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
        //       ) : imagePercent === 100 ? (
        //         <span className="text-green-700">Image uploaded successfully</span>
        //       ) : (
        //         ""
        //       )}
        //     </p>
        //     <input
        //       defaultValue={currentUser.username}
        //       type="text"
        //       id="username"
        //       placeholder="Username"
        //       className="bg-slate-100 rounded-lg p-3"
        //       onChange={handleChange}
        //       disabled={currentUser.googleAccount}
        //     />
        //     <input
        //       defaultValue={currentUser.email}
        //       type="email"
        //       id="email"
        //       placeholder="Email"
        //       className="bg-slate-100 rounded-lg p-3"
        //       onChange={handleChange}
        //       disabled={currentUser.googleAccount}
        //     />
        //     {currentUser.googleAccount ? (
        //       ""
        //     ) : (
        //       <input
        //         type="password"
        //         id="password"
        //         placeholder="Password"
        //         value={passwordField}
        //         className="bg-slate-100 rounded-lg p-3"
        //         onChange={handleChange}
        //         disabled={currentUser.googleAccount}
        //       />
        //     )}
        //     <button
        //       className="bg-slate-700 text-white rounded-lg p-3 capitalize hover:opacity-95 disabled:opacity-80"
        //       disabled={currentUser.googleAccount}
        //     >
        //       {loading ? "Loading..." : "Update"}
        //     </button>
        //   </form>
        //   <div className="flex justify-between mt-5">
        //     <span
        //       onClick={handleDeleteAccount}
        //       className="text-red-700 cursor-pointer"
        //     >
        //       Delete Account
        //     </span>
        //     <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
        //       Loggout
        //     </span>
        //   </div>
        //   <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
        //   <p className="text-green-700 mt-5">
        //     {updateSuccess && "User is updated successfully!"}
        //   </p>
        // </div>
    );
}

