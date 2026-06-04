import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services';
import type { CreateShortUrlT } from '../types';

export function useCreateShortUrl() {
    async function createShortUrl({ label, originalUrl }: CreateShortUrlT) {
        try {
            const docRef = await addDoc(collection(db, 'urls'), {
                label,
                originalUrl,
                createdAt: new Date(),
            });

            console.log('ID:', docRef.id);
        } catch (error) {
            console.error(error);
        }
    }

    return { createShortUrl };
}
