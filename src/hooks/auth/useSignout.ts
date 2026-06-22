import { signOut as signOutF } from 'firebase/auth';
import { auth } from '@/services'; //
import { handleError } from '@/utils';
import { useLoading } from '@/context';
import toast from 'react-hot-toast';

export function useSignout() {
    const { setLoading } = useLoading();

    const signOut = async () => {
        try {
            setLoading(true);

            await signOutF(auth);
            toast.success('Signed out successfully!');
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    return { signOut };
}
