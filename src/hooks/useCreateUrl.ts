import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services';
import type { CreateShortUrlT } from '../types';

export function useCreateShortUrl() {
    async function createShortUrl({ label, originalUrl }: CreateShortUrlT) {
        try {
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
