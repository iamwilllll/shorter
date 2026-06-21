import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services';
import { getIdOfUrlsInDB, getStore } from '@/indexedDB';
import { handleError } from '@/utils';

export const migrateLocalUrlToUser = async (uid: string) => {
    try {
        const urlIds = await getIdOfUrlsInDB();
        await Promise.all(urlIds.map((id) => updateDoc(doc(db, 'urls', id), { uid })));

        const store = await getStore();
        store.clear();
    } catch (err) {
        return handleError(err);
    }
};
