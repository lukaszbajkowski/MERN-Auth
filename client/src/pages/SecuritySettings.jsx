import SettingItem from "../components/settings/SettingItem.jsx";

const SecuritySettings = () => {
    const securityOptions = [
        {title: "Email", description: "Make sure the email is correct", path: "/change/email"},
        {title: "Password", description: "Secure your account with a stronger password", path: "/change/password"}
    ];

    return (
        <>
            <div className="col-span-8 bg-slate-200 p-6 pb-4 rounded-t-lg shadow-xl shadow-slate-200/50">
                <div className="grid grid-cols-12 gap-1">
                    <div className="col-start-1 col-end-13 text-black text-start my-auto">
                        <h1 className="text-2xl font-semibold">Additional account security</h1>
                    </div>
                    <div className="col-start-1 col-end-13 flex flex-col my-auto">
                        <div className="grid grid-cols-12">
                            <div className="col-start-1 col-end-13 break-all text-md font-light">
                                We recommend using additional security measures to best protect your account.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {securityOptions.map((option, index) => (
                <>
                    <SettingItem
                        key={index}
                        title={option.title}
                        description={option.description}
                        path={option.path}
                        isLast={index === securityOptions.length - 1}
                    />
                    {index !== securityOptions.length - 1 && <div className="col-span-8 bg-white p-px"></div>}
                </>
            ))}
        </>
    );
};

export default SecuritySettings;
