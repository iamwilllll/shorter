import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '@/services';
import { googleProvider } from '@/services';
import { type LoginFormT } from '@/types';
import { handleError } from '@/utils';

export function useLogin() {
    const handleLoginWithEmailAndPass = async (data: LoginFormT) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (err) {
            return handleError(err);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            return handleError(err);
        }
    };

    return { handleLoginWithEmailAndPass, handleGoogleLogin };
}
