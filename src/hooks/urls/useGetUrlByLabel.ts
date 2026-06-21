import { useCallback } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/services';
import { handleError } from '@/utils';
import { useLoading } from '@/context';

export function useGetUrlByLabel() {
    const { setLoading } = useLoading();

    const getUrlByLabel = useCallback(
        async (label: string) => {
            try {
                const q = query(collection(db, 'urls'), where('label', '==', `/${label}`));
                const snapshot = await getDocs(q);

                if (snapshot.empty) return null;
                return snapshot.docs[0].data();
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        },
        [setLoading]
    );

    return { getUrlByLabel };
}
