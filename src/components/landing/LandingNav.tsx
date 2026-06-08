import { AuthNav, Button } from '@/components';

export function LandingNav() {
    const motionProps = {
        animate: { y: 0 },
        initial: { y: 5 },
        transition: { duration: 0.5, ease: 'easeInOut' },
    };

    return (
        <nav className="flex items-center justify-between">
            <Button className="flex items-center gap-1.5 bg-transparent hover:bg-transparent" {...motionProps}>
                <svg className="text-brand">
                    <use href="/icon.svg#link-icon" />
                </svg>

                <h2 className="text-2xl font-bold text-white">Shorter</h2>
            </Button>
            <AuthNav {...motionProps} />
        </nav>
    );
}
