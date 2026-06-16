import { auth } from '@/services';
import { signInWithPopup } from 'firebase/auth';
import { googleProvider } from '@/services';
import { type SignupFormT } from '@/types';

export const useSignup = () => {
    const onSubmit = async (data: SignupFormT) => {
        const { username, email, password } = data;

        // Firebase
        // createUserWithEmailAndPassword(...)
        // updateProfile(...)

        console.log({ username, email, password });
    };

    const handleGoogleSignup = async () => {
        await signInWithPopup(auth, googleProvider);
    };

    return {
        onSubmit,
        handleGoogleSignup,
    };
};
