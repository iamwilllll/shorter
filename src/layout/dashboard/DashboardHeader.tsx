import { useAuth } from '@/hooks';

export function DashboardHeader() {
    const { user } = useAuth();

    return (
        <header className="col-start-2 row-start-1 flex items-center justify-between px-5 py-3 text-white">
            <h1>Hello, {user?.displayName || 'Guest'}!</h1>
        </header>
    );
}
