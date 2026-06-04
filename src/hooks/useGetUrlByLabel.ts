import { useCallback } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { ShortUrlT } from '../types';
import { db } from '../services';

export function useGetUrlByLabel() {
    const getUrlByLabel = useCallback(async (label: string) => {
        try {
            const q = query(collection(db, 'urls'), where('label', '==', `/${label}`));
            const snapshot = await getDocs(q);

            if (snapshot.empty) return null;
            return snapshot.docs[0].data() as Omit<ShortUrlT, 'id'>;
        } catch (error) {
            console.error(error);
            return null;
        }
    }, []);

    return { getUrlByLabel };
}
