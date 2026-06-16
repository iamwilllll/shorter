import { Routes, Route } from 'react-router-dom';
import { RedirectionPage } from '@/components';
import { LandingPage, NotFound, Login, Signup } from '@/pages';

export default function App() {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/*" element={<RedirectionPage />}></Route>
            <Route path="/404" element={<NotFound />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
        </Routes>
    );
}
