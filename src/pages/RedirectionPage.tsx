import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { arrayUnion, doc, increment, updateDoc } from 'firebase/firestore';
import { db } from '@/services';
import { useGetUrlByLabel } from '@/hooks';
import { handleError } from '@/utils';

export function RedirectionPage() {
    const { getUrlByLabel } = useGetUrlByLabel();
    const navigate = useNavigate();

    const getVisitorId = () => {
        let visitorId = localStorage.getItem('visitorId');

        if (!visitorId) {
            visitorId = crypto.randomUUID();
            localStorage.setItem('visitorId', visitorId);
        }

        return visitorId;
    };

    useEffect(() => {
        (async () => {
            try {
                const label = window.location.pathname.slice(1);
                const url = await getUrlByLabel(label);
                const visitorId = getVisitorId();

                if (url?.originalUrl) return (window.location.href = url?.originalUrl);
                if (!url) return navigate('/404');

                const docRef = doc(db, 'urls', url?.id);

                await updateDoc(docRef, {
                    clicks: increment(1),
                    uniqueClicks: arrayUnion(visitorId),
                });
            } catch (err) {
                handleError(err);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>;
}
