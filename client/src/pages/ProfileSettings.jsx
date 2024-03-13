import PropTypes from 'prop-types';

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
                         cities
                     }) => {
    return (
        <>
            <div className="col-span-8 bg-slate-200 p-6 rounded-t-lg shadow-xl shadow-slate-200/50">
                <form onSubmit={handleSubmitProfilePicture} className="grid grid-cols-12 gap-4">
                    {currentUser.googleAccount ? (
                        <>
                            <h1 className="col-start-1 col-end-6 text-black text-start my-auto">
                                Your picture
                            </h1>
                            <div className="col-start-6 col-end-13 h-24 w-24 self-center
                                cursor-default rounded-full object-cover ms-auto me-8">
                                {currentUser.profilePicture && (
                                    <img
                                        src={currentUser.profilePicture}
                                        alt="profilePicture"
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="col-start-1 col-end-3 text-black text-start my-auto">
                                Your picture
                            </h1>
                            <p className="col-start-3 col-end-7 md:col-start-3 md:col-end-6 text-sm self-center">
                                {imageError ? (
                                    <span className="text-red-700">
                                        Error uploading image (file size must be less than 5 MB)
                                    </span>
                                ) : imagePercent > 0 && imagePercent < 100 ? (
                                    <span className="text-slate-700">
                                        {`Uploading: ${imagePercent} %`}
                                    </span>
                                ) : imagePercent === 100 ? (
                                    <span className="text-green-700">
                                        Image uploaded successfully
                                    </span>
                                ) : (
                                    ""
                                )}
                            </p>
                            <input
                                type="file"
                                ref={fileRef}
                                hidden
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                disabled={currentUser.googleAccount}
                            />
                            <img
                                src={formData.profilePicture || currentUser.profilePicture}
                                alt="profilePicture"
                                className="col-start-7 col-end-10 md:col-start-6 md:col-end-10 h-24 w-24 self-center
                                cursor-pointer rounded-full object-cover ms-auto me-4"
                                onClick={() => fileRef.current.click()}
                                loading="lazy"
                            />
                            <div className="md:col-start-10 md:col-end-13 col-start-10 col-end-13 my-auto">
                                <button
                                    className="bg-slate-700 text-white rounded-lg p-3 capitalize shadow-md shadow-slate-700-50
                            transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out
                            hover:opacity-95 disabled:opacity-80 w-full"
                                    disabled={currentUser.googleAccount}
                                >
                                    {loadingImage ? "Loading..." : "Update"}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
            <div className="col-span-8 bg-white p-px"></div>
            <form onSubmit={handleSubmitUser}>
                <div className="col-span-8 bg-slate-200 p-6 rounded-b-lg shadow-xl shadow-slate-200/50 ">
                    <span className="grid grid-cols-12 gap-4">
                        <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                            A few words about you
                        </h1>
                        <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                            <textarea
                                rows="4"
                                defaultValue={currentUser.aboutUser}
                                id="aboutUser"
                                placeholder="Tell us more about yourself"
                                className="resize-none bg-slate-100 rounded-lg p-2.5 block w-full border border-gray-300 text-gray-900 text-sm block w-full"
                                onChange={handleChange}
                            />
                        </div>
                    </span>
                </div>
                <div className="col-span-8 bg-slate-200 p-6 mt-12 rounded-t-lg shadow-xl shadow-slate-200/50">
                    <span className="grid grid-cols-12 gap-4">
                        <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                            City
                        </h1>
                        <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                            <select
                                id="city"
                                name="city"
                                onChange={handleChange}
                                value={currentUser.city}
                                className="appearance-none bg-slate-100 rounded-lg border border-gray-300 text-gray-900 text-sm block w-full p-2.5 "
                            >
                                {cities.map(city => (
                                    <option key={city._id} value={city._id}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </span>
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-slate-700 text-white rounded-lg py-3 px-6 capitalize shadow-md shadow-slate-700-50
                         transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out
                         hover:opacity-95 disabled:opacity-80 me-6 mt-6"
                    >
                        {loadingProfileInfo ? "Loading..." : "Update"}
                    </button>
                </div>
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
