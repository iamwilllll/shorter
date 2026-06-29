import { useNavigate } from 'react-router-dom';
import { Button, AppIcon } from '@/components';

export function LandingNav({ className }: { className?: string }) {
    const navigate = useNavigate();

    const motionProps = {
        animate: { y: 0 },
        initial: { y: 5 },
        transition: { duration: 0.5, ease: 'easeInOut' },
    };

    return (
        <nav className={`flex items-center justify-between ${className || ''}`}>
            <AppIcon {...motionProps} />

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
