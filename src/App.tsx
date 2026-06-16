import { Routes, Route } from 'react-router-dom';
import { RedirectionPage, ProtectedRoute } from '@/components';
import { LandingPage, NotFound, Login, Signup, Dashboard } from '@/pages';

export default function App() {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/*" element={<RedirectionPage />}></Route>
            <Route path="/404" element={<NotFound />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />}></Route>
            </Route>
        </Routes>
    );
}
