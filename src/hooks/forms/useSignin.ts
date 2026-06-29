import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth, googleProvider } from '@/services';
import { useLoading } from '@/context';
import { handleError, AppError, migrateLocalUrlToUser } from '@/utils';
import { type SigninFormT } from '@/types';

export function useSignin() {
    const { setLoading } = useLoading();

    const handleSigninWithEmailAndPass = async (data: SigninFormT) => {
        try {
            setLoading(true);
            const response = await signInWithEmailAndPassword(auth, data.email, data.password);

            if (!response.user.emailVerified) {
                await auth.signOut();
                throw new AppError('auth/email-not-verified');
            }

            await migrateLocalUrlToUser(response.user.uid);

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
