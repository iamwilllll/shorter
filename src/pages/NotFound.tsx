import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/layout';
import { Button } from '@/components';
export function NotFound() {
    const navigate = useNavigate();

    return (
        <AppLayout className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-transparent to-slate-500/5 px-4">
            <div className="mb-8 text-center">
                <span className="text-tertiary-text text-sm font-bold tracking-widest uppercase">Shoter</span>

                <h1 className="mt-2 text-9xl font-black tracking-tight text-slate-400/30">404</h1>
            </div>

            <div className="bg-secondary-surface border-default-border flex w-full max-w-xl flex-col items-center rounded-lg border p-8 text-center shadow-lg">
                <h2 className="mb-3 text-3xl font-black">Page Not Found</h2>

                <p className="text-tertiary-text mb-8 max-w-sm">
                    The link you are trying to reach doesn't exist or has been moved to another location.
                </p>

                <div className="border-default-border mb-8 flex h-14 w-full items-center justify-center rounded-lg border bg-slate-500/5 px-4 text-sm font-medium text-red-400">
                    <span className="truncate">shorter/broken-link-404</span>
                </div>

                <Button onClick={() => navigate('/')} className="h-14 w-full">
                    Back to Home
                </Button>
            </div>
        </AppLayout>
    );
}
