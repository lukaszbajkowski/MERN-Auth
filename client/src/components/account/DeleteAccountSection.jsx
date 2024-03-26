import {ChevronDoubleRightIcon} from "@heroicons/react/24/outline";

const DeleteAccountSection = () => {
    return (
        <div className="col-span-8 bg-slate-200 p-6 mt-12 rounded-lg shadow-xl shadow-slate-200/50 cursor-pointer" onClick={() => {
            window.location.href = "/delete/account";
        }}>
            <div className="grid grid-cols-12 gap-4">
                <div className={`col-start-1 col-end-10 text-black text-start my-auto`}>
                    <h1>Delete Account</h1>
                </div>
                <div className="col-start-10 col-end-13 my-auto flex justify-end">
                    <div
                        className="p-3 text-slate-700 inline-block"
                        style={{minWidth: "fit-content"}}
                    >
                        <ChevronDoubleRightIcon className="h-6 w-6 float-end"/>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DeleteAccountSection;
