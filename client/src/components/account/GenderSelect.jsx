import PropTypes from "prop-types";

const GenderSelect = ({selectedGender, handleChange}) => {
    return (
        <>
            <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                Gender
            </h1>
            <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                <select
                    id="gender"
                    name="gender"
                    autoComplete="gender"
                    onChange={handleChange}
                    value={selectedGender}
                    className="appearance-none bg-slate-100 rounded-lg border border-gray-300 text-gray-900 text-sm
                    block w-full p-2.5 cursor-pointer"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
        </>
    );
};

GenderSelect.propTypes = {
    selectedGender: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default GenderSelect;
