import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '@/services';
import { useLoading } from '@/context';
import { handleError, AppError, migrateLocalUrlToUser } from '@/utils';
import { type SigninFormT } from '@/types';

export function useSignin() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();

    const handleSigninWithEmailAndPass = async (data: SigninFormT) => {
        try {
            setLoading(true);
            const response = await signInWithEmailAndPassword(auth, data.email, data.password);

            if (!response.user.emailVerified) {
                throw new AppError('auth/email-not-verified');
            }

            await migrateLocalUrlToUser(response.user.uid);

            toast.success('Welcome back!');
            navigate('/dashboard');
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
            navigate('/dashboard');
            toast.success('Welcome back!');
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    return { handleSigninWithEmailAndPass, handleGoogleSignin };
}
