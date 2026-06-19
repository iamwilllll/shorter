import { doc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { googleProvider, auth, db } from '@/services';
import { getIdOfUrlsInDB, getStore } from '@/indexedDB';
import { handleError } from '@/utils';
import { type SignupFormT } from '@/types';

export const useSignup = () => {
    const migrateLocalDataToUser = async (uid: string) => {
        try {
            const urlIds = await getIdOfUrlsInDB();
            await Promise.all(urlIds.map((id) => updateDoc(doc(db, 'urls', id), { uid })));

            const store = await getStore();
            store.clear();
        } catch (err) {
            return handleError(err);
        }
    };

    const handleEmailAndPasswordSignup = async (data: SignupFormT) => {
        try {
            const { username, email, password } = data;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: username,
            });

            await migrateLocalDataToUser(user.uid);
        } catch (err) {
            return handleError(err);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            await migrateLocalDataToUser(result.user.uid);
        } catch (err) {
            return handleError(err);
        }
    };

    return {
        handleEmailAndPasswordSignup,
        handleGoogleSignup,
    };
};
