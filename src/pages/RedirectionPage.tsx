import { useEffect } from 'react';
import { useGetUrlByLabel } from '@/hooks';

export function RedirectionPage() {
    const { getUrlByLabel } = useGetUrlByLabel();

    useEffect(() => {
        (async () => {
            const label = window.location.pathname.slice(1);
            const url = await getUrlByLabel(label);

            if (url?.originalUrl) return (window.location.href = url?.originalUrl);
            window.location.href = window.location.href = '404';
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>;
}
