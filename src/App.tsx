import { Routes, Route } from 'react-router-dom';
import { RedirectionPage, NotFound } from './components';
import { LandingPage } from './Layout';

export default function App() {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/*" element={<RedirectionPage />}></Route>
            <Route path="/404" element={<NotFound />}></Route>
        </Routes>
    );
}
