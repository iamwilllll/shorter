import { useCallback } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/services';
import { handleError } from '@/utils';
import type { UrlT } from '@/types';

export function useGetUrlByLabel() {
    const getUrlByLabel = useCallback(async (label: string) => {
        try {
            const q = query(collection(db, 'urls'), where('label', '==', `/${label}`));
            const snapshot = await getDocs(q);

            if (snapshot.empty) return null;
            return snapshot.docs[0].data() as Omit<UrlT, 'id'>;
        } catch (error) {
            handleError(error);
        }
    }, []);

    return { getUrlByLabel };
}
