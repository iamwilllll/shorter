import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/services';
import type { CreateShortUrlT } from '@/types';
import { useGetUrlByLabel, useAuth } from '@/hooks';
import { getStore } from '@/indexedDB';

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

        if (!isAuthenticated) {
            const store = await getStore();
            store.add(newUrl);
        }

        const existingUrl = await getUrlByLabel(label);
        if (existingUrl) throw new Error('URL with this label already exists');

        await addDoc(collection(db, 'urls'), newUrl);

        return `${window.location.origin}${newUrl.label}`;
    }

    return { createShortUrl };
}
