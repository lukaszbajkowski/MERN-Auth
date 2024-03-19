import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {CheckCircleIcon, ExclamationCircleIcon, XMarkIcon} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const ChangeEmailModal = ({showModal, closeModal, showSuccessMessage, error}) => {
    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeModal}>
                <div className="flex items-center justify-center min-h-screen">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-1000"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"/>
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 sm:flex sm:items-start">
                                <div
                                    className={`${error && 'bg-red-100'} ${showSuccessMessage && 'bg-green-100'} mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10`}>
                                    {error && (
                                        <ExclamationCircleIcon className="h-6 w-6 text-red-700" aria-hidden="true"/>
                                    )}
                                    {showSuccessMessage && (
                                        <CheckCircleIcon className="h-6 w-6 text-green-700" aria-hidden="true"/>
                                    )}
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <Dialog.Title as="h3"
                                                  className="text-lg leading-6 font-medium text-gray-900 flex justify-between">
                                            <span>
                                                {showSuccessMessage && "Email został zmieniony pomyślnie"}
                                                {error && "Email nie został zmieniony"}
                                            </span>
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-600 focus:outline-none ml-2 float-right"
                                            onClick={closeModal}
                                        >
                                            <XMarkIcon className="h-6 w-6"/>
                                        </button>
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {showSuccessMessage && "To complete the process of changing your email address, we will send a confirmation request to your new address."}
                                            {error && "Something went wrong!"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

ChangeEmailModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    showSuccessMessage: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
};

export default ChangeEmailModal;
