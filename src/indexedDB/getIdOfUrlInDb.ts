import { getStore } from '@/indexedDB';
import { type UrlT } from '@/types';

export const getIdOfUrlsInDB = async (): Promise<string[]> => {
    const store = await getStore();

    return new Promise((resolve, reject) => {
        const request = store.getAll();

        request.onsuccess = () => {
            const urls = request.result as UrlT[];

            const urlIds = urls.filter((url) => typeof url.id === 'string').map((url) => url.id);

            resolve(urlIds);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
};
