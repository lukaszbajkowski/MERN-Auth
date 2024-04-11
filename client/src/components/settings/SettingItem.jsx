import {ChevronDoubleRightIcon} from "@heroicons/react/24/outline/index.js";
import PropTypes from "prop-types";

const SettingItem = ({title, description, path, isLast}) => {
    const handleRedirect = (path) => {
        window.location.href = path;
    };

    return (
        <div
            className={`col-span-8 bg-slate-200 py-3 px-6 shadow-xl shadow-slate-200/50 cursor-pointer transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out hover:bg-slate-300 hover:bg-opacity-80 hover:shadow-slate-300/50 ${isLast ? 'rounded-b-lg' : ''}`}
            onClick={() => handleRedirect(path)}
        >
            <div className="grid grid-cols-12 gap-4">
                <div className="col-start-1 col-end-10 grid grid-cols-12 gap-0 text-black text-start my-auto">
                    <div className="col-start-1 col-end-13 font-semibold text-start my-auto">
                        <h1>{title}</h1>
                    </div>
                    <div className="col-start-1 col-end-13 flex flex-col my-auto">
                        <div className="grid grid-cols-12">
                            <div className="col-start-1 col-end-13 break-all font-light">{description}</div>
                        </div>
                    </div>
                </div>
                <div className="col-start-10 col-end-13 my-auto flex justify-end">
                    <div className="p-3 text-slate-700 inline-block" style={{minWidth: "fit-content"}}>
                        <ChevronDoubleRightIcon className="h-6 w-6 float-end"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

SettingItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    isLast: PropTypes.bool
};

export default SettingItem;