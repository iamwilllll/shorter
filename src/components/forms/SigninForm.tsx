import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@/components';
import { useAuth, useSignin } from '@/hooks';
import { type SigninFormT } from '@/types';

export function SigninForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { handleSigninWithEmailAndPass, handleGoogleSignin } = useSignin();
    const { isAuthenticated, isLoading } = useAuth();
    const { register, handleSubmit, formState } = useForm<SigninFormT>();

    const onSubmit = async (data: SigninFormT) => {
        const response = await handleSigninWithEmailAndPass(data);

        if (response?.error) {
            setErrorMessage(response.message);
        }
    };

    if (isLoading) return null;
    if (isAuthenticated) return <Navigate to="/" replace />;
    if (!isAuthenticated)
        return (
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
                <div>
                    <label className="text-secondary-text mb-2 block text-sm" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="border-default-border bg-primary-surface w-full rounded-lg border px-4 py-3 outline-none"
                        {...register('email', {
                            required: 'Email is required',
                        })}
                    />

                    <ErrorMessage message={formState.errors.email?.message} />
                </div>

                <div>
                    <label className="text-secondary-text mb-2 block text-sm" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="border-default-border bg-primary-surface w-full rounded-lg border px-4 py-3 outline-none"
                        {...register('password', {
                            required: 'Password is required',
                        })}
                    />

                    <ErrorMessage message={formState.errors.password?.message} />
                </div>

                {errorMessage && <ErrorMessage message={errorMessage} className="w-full sm:p-0 sm:text-[14px]" />}

                <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="bg-brand text-on-brand hover:bg-brand/50 flex w-full items-center justify-center rounded-lg py-3 font-medium transition"
                >
                    {formState.isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>

                <div className="flex w-full items-center">
                    <div className="border-default-border h-px w-full border-t"></div>
                    <p className="text-secondary-text my-5 px-5 text-center text-sm">OR</p>
                    <div className="border-default-border h-px w-full border-t"></div>
                </div>

                <button
                    onClick={handleGoogleSignin}
                    className="border-default-border hover:bg-primary-surface flex w-full items-center justify-center gap-3 rounded-lg border py-3 transition"
                >
                    <svg width="20" height="20" viewBox="0 0 48 48">
                        <use href="/assets/icons.svg#google-icon" />
                    </svg>
                    Continue with Google
                </button>
            </form>
        );
}
