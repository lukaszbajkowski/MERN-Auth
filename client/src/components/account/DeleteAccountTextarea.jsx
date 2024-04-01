import PropTypes from 'prop-types';

const AboutUserTextarea = ({value, onChange}) => {
    return (
        <>
            <h1 className="col-start-1 col-end-13 text-black text-start my-auto">
                Delete Account
            </h1>
            <div className="col-start-1 col-end-13 flex flex-col my-auto">
                <textarea
                    rows="4"
                    placeholder="Tell us more about why you want to delete your account..."
                    className="resize-none bg-slate-100 rounded-lg p-2.5 block w-full border border-gray-300
                    text-gray-900 text-sm block w-full"
                    value={value}
                    onChange={onChange}
                />
            </div>
        </>
    );
};

AboutUserTextarea.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default AboutUserTextarea;
