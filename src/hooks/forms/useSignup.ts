import { doc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, updateProfile } from 'firebase/auth';
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
            const { username, email, password, confirmPassword } = data;

            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);
            await updateProfile(user, { displayName: username, photoURL: null });
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
