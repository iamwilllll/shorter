import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, updateProfile } from 'firebase/auth';
import { googleProvider, auth } from '@/services';
import { handleError, migrateLocalUrlToUser } from '@/utils';
import { type SignupFormT } from '@/types';

export const useSignup = () => {
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
            await migrateLocalUrlToUser(user.uid);
        } catch (err) {
            return handleError(err);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            await migrateLocalUrlToUser(result.user.uid);
        } catch (err) {
            return handleError(err);
        }
    };

    return {
        handleEmailAndPasswordSignup,
        handleGoogleSignup,
    };
};
