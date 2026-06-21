import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/services';
import { handleError, migrateLocalUrlToUser } from '@/utils';
import { type SigninFormT } from '@/types';
import { useAuth } from '@/hooks';
import { useLoading } from '@/context';

export function useSignin() {
    const { user } = useAuth();
    const { setLoading } = useLoading();

    const handleSigninWithEmailAndPass = async (data: SigninFormT) => {
        try {
            setLoading(true);
            if (user?.emailVerified) {
                const response = await signInWithEmailAndPassword(auth, data.email, data.password);
                await migrateLocalUrlToUser(response.user.uid);
            } else {
                throw new Error('Please verify your email before signing in');
            }
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignin = async () => {
        try {
            setLoading(true);

            const response = await signInWithPopup(auth, googleProvider);
            await migrateLocalUrlToUser(response.user.uid);
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    return { handleSigninWithEmailAndPass, handleGoogleSignin };
}
