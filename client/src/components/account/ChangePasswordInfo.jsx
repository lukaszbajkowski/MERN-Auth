export default function ChangePasswordInfo () {
    return (
        <div>
            <h1 className="text-lg font-medium text-start my-auto text-neutral-800">
                To set up a powerful password:
            </h1>
            <div className="flex flex-col my-auto text-sm ps-6 pt-3">
                <ul className={`text-neutral-700 list-decimal space-y-2`}>
                    <li>
                        Create passwords that are hard to guess. These can be combinations from numbers, special
                        symbols, upper and lower case letters. The length of the password must be at least 8 symbols.
                    </li>
                    <li>
                        Use at least one digit in the password.
                    </li>
                    <li>
                        Do not create passwords from your login, frequently used and easily predicted words.
                    </li>
                    <li>
                        Memorise them, don't write them down, don't tell anyone, change them regularly.
                    </li>
                    <li>
                        Only use passwords when no one can see them.
                    </li>
                </ul>
            </div>
        </div>
    );
};

