import { AuthNav, Button, UserMenu } from '@/components';
import { useAuth } from '@/hooks';

export function LandingNav({ className }: { className?: string }) {
    const { isLoading, user } = useAuth();

    const motionProps = {
        animate: { y: 0 },
        initial: { y: 5 },
        transition: { duration: 0.5, ease: 'easeInOut' },
    };

    return (
        <nav className={`flex items-center justify-between ${className || ''}`}>
            <Button className="flex items-center gap-1.5 bg-transparent hover:bg-transparent md:px-0" {...motionProps}>
                <svg className="text-brand">
                    <use href="/icon.svg#link-icon" />
                </svg>

                <h2 className="text-2xl font-bold text-white">Shorter</h2>
            </Button>

            {isLoading ? (
                <div className="bg-primary-surface h-10 w-10 rounded-full" />
            ) : user ? (
                <UserMenu />
            ) : (
                <AuthNav {...motionProps} />
            )}
        </nav>
    );
}
