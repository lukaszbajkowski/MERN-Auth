import PropTypes from "prop-types";

const ChangeEmailForm = ({
                             currentUser,
                             handleSubmit,
                             handleChange,
                         }) => {
    return (
        <form
            onSubmit={(e) => {
                handleSubmit(e);
            }}
            className="grid grid-cols-12 gap-4"
        >
            <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                Current Email
            </h1>
            <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                <text className="p-2.5 block text-sm w-full">
                    {currentUser.email}
                </text>
            </div>
            <h1 className="col-start-1 col-end-7 text-black text-start my-auto">
                New Email
            </h1>
            <div className="md:col-start-7 col-start-1 col-end-13 flex flex-col my-auto">
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="resize-none bg-slate-100 rounded-lg p-2.5 block w-full border border-gray-300
                    text-gray-900 text-sm block w-full"
                    onChange={handleChange}
                />
            </div>
        </form>
    );
};

ChangeEmailForm.propTypes = {
    currentUser: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default ChangeEmailForm;
