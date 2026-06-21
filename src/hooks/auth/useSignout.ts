import { signOut as signOutF } from 'firebase/auth';
import { auth } from '@/services'; //
import { handleError } from '@/utils';
import { useLoading } from '@/context';

export function useSignout() {
    const { setLoading } = useLoading();

    const signOut = async () => {
        try {
            setLoading(true);

            await signOutF(auth);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    return { signOut };
}
