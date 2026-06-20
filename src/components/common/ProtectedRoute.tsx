import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks';

export function ProtectedRoute() {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    return user && user.emailVerified ? <Outlet /> : <Navigate to="/signin" replace />;
}
