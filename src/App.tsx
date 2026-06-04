import { useEffect } from 'react';
import { useCreateShortUrl, useGetUrlByLabel, useReadUrls } from './hooks';
import { handleFormData } from './utils';
import { useUrls } from './context';

/* 
! Basic URL structure
! protocol://subDomain.domain
*/

export default function App() {
    const { createShortUrl } = useCreateShortUrl();
    const { readUrls } = useReadUrls();
    const { setUrls } = useUrls();
    const { getUrlByLabel } = useGetUrlByLabel();

    useEffect(() => {
        (async () => {
            const responseUrls = await readUrls();

            if (responseUrls) {
                setUrls(responseUrls);
            }

            const label = window.location.pathname.slice(1);

            const url = await getUrlByLabel(label);
            if (url?.originalUrl) window.location.href = url?.originalUrl;
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const $INPUTS = form.querySelectorAll('input');
        const formateData = handleFormData($INPUTS);

        createShortUrl(formateData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="" id="originalUrl" className="border" />
                <input type="text" name="" id="label" className="border" />
                <button type="submit">submit</button>
            </form>
        </div>
    );
}
