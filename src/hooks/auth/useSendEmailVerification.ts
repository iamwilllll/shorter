import { sendEmailVerification } from 'firebase/auth';
import { auth } from '@/services';
import { handleError } from '@/utils';
import { useLoading } from '@/context';

export function useEmailVerification() {
    const { setLoading } = useLoading();

    const resendEmail = async () => {
        try {
            setLoading(true);
            const user = auth.currentUser;

            if (!user) {
                throw new Error('No authenticated user found');
            }

            await sendEmailVerification(user);
        } catch (error) {
            return handleError(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        resendEmail,
    };
}
