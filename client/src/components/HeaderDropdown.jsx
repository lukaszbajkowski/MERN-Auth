import {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {signOut} from '../redux/user/userSlice';
import {useDispatch} from 'react-redux';

function classNames (...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function HeaderDropdown ({currentUser}) {
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            await fetch('/api/auth/signout');
            dispatch(signOut());
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div className="h-9 w-9">
                <Menu.Button className="inline-flex w-full justify-center focus:outline-none">
                    <img
                        src={currentUser.profilePicture}
                        alt="profilePicture"
                        className="h-9 w-9 py-auto rounded-full object-cover"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <MenuItem href="/profile">Profile details</MenuItem>
                        <MenuItem href="/account-settings">Account settings</MenuItem>
                        <MenuItem href="/security-settings">Security settings</MenuItem>
                    </div>
                    <div className="py-1">
                        <MenuItem href="/personalization">Personalization</MenuItem>
                    </div>
                    <div className="py-1">
                        <MenuItem href="/share">Share</MenuItem>
                    </div>
                    <div className="py-1">
                        <MenuItem onClick={handleSignOut} className="text-red-700 hover:bg-red-100">
                            Logout
                        </MenuItem>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

function MenuItem ({href, onClick, children}) {
    return (
        <Menu.Item>
            {({active}) => (
                <a
                    href={href}
                    onClick={onClick}
                    className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
                >
                    {children}
                </a>
            )}
        </Menu.Item>
    );
}
