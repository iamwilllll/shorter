import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services';

import { signInWithPopup } from 'firebase/auth';
import { googleProvider } from '@/services';
import { type LoginFormT } from '@/types';

export function useLogin() {
    const onSubmit = async (data: LoginFormT) => {
        await signInWithEmailAndPassword(auth, data.email, data.password);
    };

    const handleGoogleLogin = async () => {
        await signInWithPopup(auth, googleProvider);
    };

    return { onSubmit, handleGoogleLogin };
}
