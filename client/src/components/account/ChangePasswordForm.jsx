import PropTypes from "prop-types";

const ChangePasswordForm = ({handleSubmit, handleChange, passwordField}) => {
    return (
        <form
            onSubmit={(e) => {
                handleSubmit(e);
            }}
            className="grid grid-cols-12 gap-4"
        >
            <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                Password
            </h1>
            <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={passwordField}
                    className="resize-none bg-slate-100 rounded-lg p-2.5 block w-full border border-gray-300
                            text-gray-900 text-sm block w-full"
                    onChange={handleChange}
                />
            </div>
        </form>
    );
};

ChangePasswordForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    passwordField: PropTypes.string.isRequired
};

export default ChangePasswordForm;





