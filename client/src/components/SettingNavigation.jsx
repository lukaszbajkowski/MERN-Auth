import {Link, useLocation} from "react-router-dom";

export default function SettingNavigation () {
    const location = useLocation();
    const isProfileDetailsActive = location.pathname === '/profile';
    const isAccountSettingsActive = location.pathname === '/account-settings';
    const isSecuritySettingsActive = location.pathname === '/security-settings';

    return (
        <div className="col-span-4">
            <div className="text-xl px-4 pb-4">
                Settings
            </div>
            <div className={`bg-slate-200 bg-opacity-0 font-lg transition duration-300 ease-in-out hover:shadow-md 
            hover:shadow-slate-200/50 hover:transition hover:duration-300 hover:ease-in-out hover:bg-opacity-40`}>
                <Link
                    to="/profile"
                    className={`text-black ${isProfileDetailsActive ? 'text-opacity-100' : 'text-opacity-50'}`}
                >
                    <div className={`mb-2 px-4 py-3`}>
                        Profile details
                    </div>
                </Link>
            </div>
            <div className={`bg-slate-200 bg-opacity-0  font-lg transition duration-300 ease-in-out hover:shadow-md 
            hover:shadow-slate-200/50 hover:transition hover:duration-300 hover:ease-in-out hover:bg-opacity-40`}>
                <Link
                    to="/account-settings"
                    className={`text-black ${isAccountSettingsActive ? 'text-opacity-100' : 'text-opacity-50'}`}
                >
                    <div className={`mb-2 px-4 py-3`}>
                        Account settings
                    </div>
                </Link>
            </div>
            <div className={`bg-slate-200 bg-opacity-0  font-lg transition duration-300 ease-in-out hover:shadow-md 
            hover:shadow-slate-200/50 hover:transition hover:duration-300 hover:ease-in-out hover:bg-opacity-40`}>
                <Link
                    to="/security-settings"
                    className={`text-black ${isSecuritySettingsActive ? 'text-opacity-100' : 'text-opacity-50'}`}
                >
                    <div className={`mb-2 px-4 py-3`}>
                        Security settings
                    </div>
                </Link>
            </div>
        </div>
    );
}





