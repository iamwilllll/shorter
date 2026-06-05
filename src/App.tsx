import { Routes, Route } from 'react-router-dom';
import { Form, RedirectionPage, NotFound } from './components';

export default function App() {
    return (
        <Routes>
            <Route index element={<Form />} />
            <Route path="/*" element={<RedirectionPage />}></Route>
            <Route path="/404" element={<NotFound />}></Route>
        </Routes>
    );
}
