import PropTypes from 'prop-types';

const RealNameInput = ({name, handleChange}) => {
    return (
        <>
            <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                Real name
            </h1>
            <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                <input
                    defaultValue={name}
                    id="name"
                    placeholder="First name and last name"
                    className="resize-none bg-slate-100 rounded-lg p-2.5 block w-full border border-gray-300
                    text-gray-900 text-sm block w-full"
                    onChange={handleChange}
                />
            </div>
        </>
    );
};

RealNameInput.propTypes = {
    name: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default RealNameInput;
