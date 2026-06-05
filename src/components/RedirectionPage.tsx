import { useEffect } from 'react';
import { useGetUrlByLabel, useReadUrls } from '../hooks';
import { useUrls } from '../context';

export function RedirectionPage() {
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
            if (url?.originalUrl) return (window.location.href = url?.originalUrl);
            window.location.href = window.location.href = '404';
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>;
}
