const ProfileForm = ({currentUser, formData, setImage, imageError, imagePercent, handleSubmit, fileRef, loading}) => {
    return (
        <>
            <div className="col-span-8 bg-slate-200 p-6 rounded-t-lg shadow-xl shadow-slate-200/50">
                <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
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
                    {currentUser.googleAccount ? (
                        <div className="h-24 w-24 self-center mt-2">
                            {currentUser.profilePicture && (
                                <img
                                    src={currentUser.profilePicture}
                                    alt="profilePicture"
                                    className="h-full w-full rounded-full object-cover"
                                />
                            )}
                        </div>
                    ) : (
                        <>
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
                                className="col-start-7 col-end-10 md:col-start-6 md:col-end-10 h-24 w-24 self-center cursor-pointer rounded-full object-cover ms-auto me-4"
                                onClick={() => fileRef.current.click()}
                                disabled={currentUser.googleAccount}
                            />
                        </>
                    )}
                    <div className="md:col-start-10 md:col-end-13 col-start-10 col-end-13 my-auto">
                        <button
                            className="bg-slate-700 text-white rounded-lg p-3 capitalize hover:opacity-95 disabled:opacity-80 w-full"
                            disabled={currentUser.googleAccount}
                        >
                            {loading ? "Loading..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProfileForm;
