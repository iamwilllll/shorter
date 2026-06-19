import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/services';
import { handleError } from '@/utils';
import { type SigninFormT } from '@/types';

export function useSignin() {
    const handleSigninWithEmailAndPass = async (data: SigninFormT) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (err) {
            return handleError(err);
        }
    };

    const handleGoogleSignin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            return handleError(err);
        }
    };

    return { handleSigninWithEmailAndPass, handleGoogleSignin };
}
