import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services';
import { useGetUrlByLabel, useAuth } from '@/hooks';
import { getStore, getIdOfUrlsInDB } from '@/indexedDB';
import type { CreateUrlT, NewUrlT } from '@/types';
import { handleError } from '@/utils';
import { useLoading } from '@/context';

export function useCreateUrl() {
    const { getUrlByLabel } = useGetUrlByLabel();
    const { isAuthenticated, user } = useAuth();
    const { setLoading } = useLoading();

    async function createUrl({ label, originalUrl }: CreateUrlT) {
        try {
            setLoading(true);
            const formattedLabel = `/${label.trim().toLowerCase().replace(/\s+/g, '-')}`;
            const newUrl: NewUrlT = {
                id: `${crypto.randomUUID()}`,
                label: formattedLabel,
                originalUrl,
                createdAt: new Date(),
                clicks: 0,
                uniqueClicks: [],
            };

            const existingUrl = await getUrlByLabel(label);
            if (existingUrl) throw new Error('URL with this label already exists');

            if (!isAuthenticated) {
                const urlIds = await getIdOfUrlsInDB();

                if (urlIds.length > 25) {
                    throw new Error('You have reached the maximum limit of 25 URLs. Please sign up.');
                }
            }

            if (!isAuthenticated) {
                const store = await getStore();
                store.add(newUrl);
            }

            if (user) newUrl.uid = user.uid;
            await setDoc(doc(db, 'urls', newUrl.id), newUrl);

            return `${window.location.origin}${newUrl.label}`;
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    }

    return { createUrl };
}
