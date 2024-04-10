import {ChevronDoubleRightIcon} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const DeleteAccountSection = (currentUser) => {
    return (
        <div
            className="col-span-8 bg-slate-200 p-6 mt-12 rounded-lg shadow-xl shadow-slate-200/50 cursor-pointer transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out hover:bg-slate-300 hover:bg-opacity-80 hover:shadow-slate-300/50"
            onClick={() => {
                window.location.href = "/delete/account";
            }}
        >
            <div className="grid grid-cols-12 gap-4">
                <div className={`col-start-1 col-end-10 text-black text-start my-auto`}>
                    <h1>Delete Account</h1>
                </div>
                <div className="col-start-10 col-end-13 my-auto flex justify-end">
                    <div
                        className={`${!currentUser.googleAccount ? 'p-3' : ''}text-slate-700 inline-block`}
                        style={{minWidth: "fit-content"}}
                    >
                        <ChevronDoubleRightIcon className="h-6 w-6 float-end"/>
                    </div>
                </div>
            </div>
        </div>

    );
};

DeleteAccountSection.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default DeleteAccountSection;
