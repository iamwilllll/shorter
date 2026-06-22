import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/services';
import { handleError, migrateLocalUrlToUser } from '@/utils';
import { type SigninFormT } from '@/types';
import { useLoading } from '@/context';
import toast from 'react-hot-toast';

export function useSignin() {
    const { setLoading } = useLoading();

    const handleSigninWithEmailAndPass = async (data: SigninFormT) => {
        try {
            setLoading(true);
            const response = await signInWithEmailAndPassword(auth, data.email, data.password);

            if (response.user?.emailVerified) await migrateLocalUrlToUser(response.user.uid);
            if (!response.user?.emailVerified) {
                throw new Error('Please verify your email before signing in');
            }

            toast.success('Welcome back!');
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
            toast.success('Welcome back!');
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    return { handleSigninWithEmailAndPass, handleGoogleSignin };
}
