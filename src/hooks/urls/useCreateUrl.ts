import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services';
import { useGetUrlByLabel, useAuth } from '@/hooks';
import { getStore, getIdOfUrlsInDB } from '@/indexedDB';
import type { CreateShortUrlT } from '@/types';

export function useCreateShortUrl() {
    const { getUrlByLabel } = useGetUrlByLabel();
    const { isAuthenticated } = useAuth();

    async function createShortUrl({ label, originalUrl }: CreateShortUrlT) {
        const formattedLabel = `/${label.trim().toLowerCase().replace(/\s+/g, '-')}`;
        const newUrl = {
            id: `${crypto.randomUUID()}`,
            label: formattedLabel,
            originalUrl,
            createdAt: new Date(),
        };

        const existingUrl = await getUrlByLabel(label);
        if (existingUrl) throw new Error('URL with this label already exists');

        if (!isAuthenticated) {
            const urlIds = await getIdOfUrlsInDB();

            if (urlIds.length > 25) {
                throw new Error('You have reached the maximum limit of 25 URLs. Please sign up.');
            }
        }

        await setDoc(doc(db, 'urls', newUrl.id), newUrl);

        if (!isAuthenticated) {
            const store = await getStore();
            store.add(newUrl);
        }
        return `${window.location.origin}${newUrl.label}`;
    }

    return { createShortUrl };
}
