import { useLoading } from '@/context';
import { useAuth } from '@/hooks';
import { useEffect } from 'react';

type AppLayoutProps = {
    className?: string;
    children: React.ReactNode;
};

export function AppLayout({ className, children }: AppLayoutProps) {
    const { loading } = useLoading();
    const { isLoading } = useAuth();

    useEffect(() => {
        if (loading || isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [loading, isLoading]);

    return (
        <main className={className}>
            {(loading || isLoading) && (
                <div className="bg-modal-surface fixed inset-0 z-50 flex items-center justify-center">
                    <div className="loader"></div>
                </div>
            )}

            {children}
        </main>
    );
}
