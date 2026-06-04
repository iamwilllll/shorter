import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services';
import type { ShortUrlT } from '../types';

export function useReadUrls() {
    async function readUrls() {
        try {
            const snapshot = await getDocs(collection(db, 'urls'));

            const urls: ShortUrlT[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<ShortUrlT, 'id'>),
            }));

            return urls;
        } catch (error) {
            console.error(error);
        }
    }

    return { readUrls };
}
