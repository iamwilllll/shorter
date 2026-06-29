import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components';
import { LandingPage, RedirectionPage, NotFound, Signin, Signup, Home } from '@/pages';

export default function App() {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/*" element={<RedirectionPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Home />} />
            </Route>
        </Routes>
    );
}
