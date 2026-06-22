import { useEffect } from 'react';
import { useAuth } from '@/hooks';
import { useLoading } from '@/context';
import { Toaster } from 'react-hot-toast';

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

            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 2000,
                    style: {
                        color: 'var(--text-primary)',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem',
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                        backdropFilter: 'blur(12px)',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',

                        border: '1px solid color-mix(in srgb, var(--success) 30%, transparent)',
                        background: 'color-mix(in srgb, var(--success) 10%, transparent)',
                    },

                    error: {
                        style: {
                            border: '1px solid color-mix(in srgb, var(--error) 30%, transparent)',
                            background: 'color-mix(in srgb, var(--error) 10%, transparent)',
                        },
                    },
                }}
            />

            {children}
        </main>
    );
}
