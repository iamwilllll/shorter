export function getStore(): Promise<IDBObjectStore> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('localUrlsDB', 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            if (!db.objectStoreNames.contains('urls')) {
                db.createObjectStore('urls', {
                    keyPath: 'id',
                });
            }
        };

        request.onerror = () => reject(request.error);

        request.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const transaction = db.transaction('urls', 'readwrite');
            const store = transaction.objectStore('urls');

            resolve(store);
        };
    });
}
