import { useState } from 'react';
import { useAuth, useSignout } from '@/hooks';

export function UserMenu() {
    const { user } = useAuth();
    const [active, setActive] = useState(false);
    const { signOut } = useSignout();

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <button onClick={handleClick} className="relative">
            <img
                src={user?.photoURL || '/avatar-placeholder.png'}
                alt="User avatar"
                className="border-default-border h-10 w-10 rounded-full border-2"
            />

            {active && (
                <div className="border-default-border bg-tertiary-surface absolute z-20 mt-2 w-48 rounded-lg border py-1 shadow-lg">
                    <button className="hover:bg-secondary-surface block w-full px-4 py-2 text-left" onClick={() => signOut()}>
                        Logout
                    </button>
                </div>
            )}
        </button>
    );
}
