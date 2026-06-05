import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services';
import type { CreateShortUrlT } from '../types';
import { useGetUrlByLabel } from '../hooks';

export function useCreateShortUrl() {
    const { getUrlByLabel } = useGetUrlByLabel();

    async function createShortUrl({ label, originalUrl }: CreateShortUrlT) {
        try {
            const existingUrl = await getUrlByLabel(label);
            if (existingUrl) throw new Error('URL with this label already exists');

            const formattedLabel = `/${label.trim().toLowerCase().replace(/\s+/g, '-')}`;

            await addDoc(collection(db, 'urls'), {
                label: formattedLabel,
                originalUrl,
                createdAt: new Date(),
            });

            return `${window.location.origin}${formattedLabel}`;
        } catch (error) {
            console.error(error);
        }
    }

    return { createShortUrl };
}
