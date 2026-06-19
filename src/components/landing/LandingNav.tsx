import { useNavigate } from 'react-router-dom';
import { Button } from '@/components';

export function LandingNav({ className }: { className?: string }) {
    const navigate = useNavigate();

    const motionProps = {
        animate: { y: 0 },
        initial: { y: 5 },
        transition: { duration: 0.5, ease: 'easeInOut' },
    };

    return (
        <nav className={`flex items-center justify-between ${className || ''}`}>
            <Button
                className="flex items-center gap-1.5 bg-transparent hover:bg-transparent md:px-0"
                onClick={() => navigate('/')}
                {...motionProps}
            >
                <svg className="text-brand">
                    <use href="/icon.svg#link-icon" />
                </svg>

                <h2 className="text-2xl font-bold text-white">Shorter</h2>
            </Button>

            <div className="flex gap-4">
                <Button
                    onClick={() => navigate('/signin')}
                    className={`border-default-border border bg-transparent hover:bg-transparent`}
                    label="Sign in"
                    {...motionProps}
                />

                <Button onClick={() => navigate('/signup')} label="Sign up" {...motionProps} />
            </div>
        </nav>
    );
}
