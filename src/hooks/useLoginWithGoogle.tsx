import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/services/firebase';

export function useLoginWithGoogle() {
    const provider = new GoogleAuthProvider();

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            const user = result.user;
            console.log('¡Login was successful!', user.displayName);

            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (!credential) throw new Error('Credential not found');
            const token = credential.accessToken;
            console.log(token);
        } catch (error) {
            console.error('Error:', (error as Error).message);
        }
    };

    return { loginWithGoogle };
}
