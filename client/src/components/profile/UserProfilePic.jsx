import PropTypes from 'prop-types';

const UserProfilePic = ({
                            imageError,
                            imagePercent,
                            fileRef,
                            setImage,
                            currentUser,
                            formData,
                            loadingImage,
                            handleFileClick,
                            handleSubmitProfilePicture,
                        }) => {
    return (
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
                className="col-start-7 col-end-10 md:col-start-6 h-24 w-24 self-center cursor-pointer
                rounded-full object-cover ms-auto me-4"
                onClick={handleFileClick}
                loading="lazy"
            />
            <div className="col-start-10 col-end-13 my-auto">
                <button
                    className="bg-slate-700 text-white rounded-lg p-3 capitalize shadow-md shadow-slate-700-50
                    transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out
                    hover:opacity-95 disabled:opacity-80 w-full"
                    disabled={currentUser.googleAccount}
                    onClick={handleSubmitProfilePicture}
                >
                    {loadingImage ? "Loading..." : "Update"}
                </button>
            </div>
        </>
    );
};

UserProfilePic.propTypes = {
    imageError: PropTypes.bool.isRequired,
    imagePercent: PropTypes.number.isRequired,
    fileRef: PropTypes.object.isRequired,
    setImage: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    formData: PropTypes.object.isRequired,
    loadingImage: PropTypes.bool.isRequired,
    handleFileClick: PropTypes.func.isRequired,
    handleSubmitProfilePicture: PropTypes.func.isRequired,
};

export default UserProfilePic;
