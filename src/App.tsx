import { Routes, Route } from 'react-router-dom';
import { RedirectionPage, ProtectedRoute } from '@/components';
import { LandingPage, NotFound, Login, Signup, Dashboard } from '@/pages';

export default function App() {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/*" element={<RedirectionPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    );
}
