import { useLoading } from '@/context';
import { useAuth } from '@/hooks';

type AppLayoutProps = {
    className?: string;
    children: React.ReactNode;
};

export function AppLayout({ className, children }: AppLayoutProps) {
    const { loading } = useLoading();
    const { isLoading } = useAuth();

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
