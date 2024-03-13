import PropTypes from 'prop-types';

const GoogleUserProfilePic = ({ currentUser }) => {
    return (
        <>
            <h1 className="col-start-1 col-end-6 text-black text-start my-auto">
                Your picture
            </h1>
            <div className="col-start-6 col-end-13 h-24 w-24 self-center cursor-default rounded-full object-cover ms-auto me-8">
                {currentUser.profilePicture && (
                    <img
                        src={currentUser.profilePicture}
                        alt="profilePicture"
                        className="h-full w-full rounded-full object-cover"
                    />
                )}
            </div>
        </>
    );
};

GoogleUserProfilePic.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default GoogleUserProfilePic;
