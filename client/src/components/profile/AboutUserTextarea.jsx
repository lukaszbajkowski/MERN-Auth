import React from 'react';
import PropTypes from 'prop-types';

const AboutUserTextarea = ({aboutUser, handleChange}) => {
    return (
        <>
            <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                A few words about you
            </h1>
            <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                <textarea
                    rows="4"
                    defaultValue={aboutUser}
                    id="aboutUser"
                    placeholder="Tell us more about yourself"
                    className="resize-none bg-slate-100 rounded-lg p-2.5 block w-full border border-gray-300
                    text-gray-900 text-sm block w-full"
                    onChange={handleChange}
                />
            </div>
        </>
    );
};

AboutUserTextarea.propTypes = {
    aboutUser: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default AboutUserTextarea;
