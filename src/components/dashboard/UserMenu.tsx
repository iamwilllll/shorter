import { useEffect, useRef, useState } from 'react';
import { useAuth, useSignout } from '@/hooks';

type UserMenuProps = {
    className?: string;
    isCompact?: boolean;
};

export function UserMenu({ className, isCompact }: UserMenuProps) {
    const { user } = useAuth();
    const { signOut } = useSignout();

    const [active, setActive] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            setActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={ref} className={`relative w-full ${className || ''}`}>
            <button
                onClick={() => setActive((p) => !p)}
                className={`group flex w-full items-center gap-2.5 rounded-lg py-2 transition-colors ${
                    isCompact ? '' : 'hover:bg-secondary-surface px-2.5'
                }`}
            >
                <img
                    src={user?.photoURL || '/avatar-placeholder.png'}
                    alt="User avatar"
                    className="border-default-border h-10 w-10 shrink-0 rounded-full border-2"
                />

                {!isCompact && <span className="leading-none whitespace-nowrap text-white">{user?.displayName || 'User'}</span>}
            </button>

            {active && (
                <div className="border-default-border bg-tertiary-surface absolute bottom-full left-0 mb-2 w-48 rounded-lg border py-1 shadow-lg">
                    <button
                        className="hover:bg-secondary-surface block w-full px-4 py-2 text-left"
                        onClick={() => {
                            signOut();
                            setActive(false);
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
