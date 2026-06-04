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

            await addDoc(collection(db, 'urls'), {
                label: `/${label}`,
                originalUrl,
                createdAt: new Date(),
            });
        } catch (error) {
            console.error(error);
        }
    }

    return { createShortUrl };
}
