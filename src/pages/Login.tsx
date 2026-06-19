import { useForm } from 'react-hook-form';
import { ErrorMessage, LandingNav } from '@/components';
import { AppLayout, Footer } from '@/layout';
import { useAuth, useLogin } from '@/hooks';
import { type LoginFormT } from '@/types';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

export function Login() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { handleLoginWithEmailAndPass, handleGoogleLogin } = useLogin();
    const { isAuthenticated, isLoading } = useAuth();
    const { register, handleSubmit, formState } = useForm<LoginFormT>();

    const onSubmit = async (data: LoginFormT) => {
        const response = await handleLoginWithEmailAndPass(data);

        if (response?.error) {
            setErrorMessage(response.message);
        }
    };

    if (isLoading) return null;
    if (isAuthenticated) return <Navigate to="/" replace />;
    if (!isAuthenticated)
        return (
            <AppLayout className="m-auto grid h-full max-w-7xl grid-rows-[auto_1fr] gap-10 p-4 md:gap-5 md:p-5">
                <LandingNav />

                <section className="bg-secondary-surface border-default-border mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-lg border p-5 md:max-w-150 md:p-10">
                    <div className="mb-8">
                        <h1 className="text-primary-text text-center text-3xl font-bold">Welcome back</h1>
                        <p className="text-secondary-text mt-2 text-center">Sign in to manage your short links and analytics.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
                        <div>
                            <label className="text-secondary-text mb-2 block text-sm">Email</label>
                            <input
                                type="email"
                                className="border-default-border bg-primary-surface w-full rounded-lg border px-4 py-3 outline-none"
                                {...register('email', {
                                    required: 'Email is required',
                                })}
                            />

                            <ErrorMessage message={formState.errors.email?.message} />
                        </div>

                        <div>
                            <label className="text-secondary-text mb-2 block text-sm">Password</label>
                            <input
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
                    </form>

                    <p className="text-secondary-text my-5 text-sm">OR</p>

                    <button
                        onClick={handleGoogleLogin}
                        className="border-default-border hover:bg-primary-surface flex w-full items-center justify-center gap-3 rounded-lg border py-3 transition"
                    >
                        <svg width="20" height="20" viewBox="0 0 48 48">
                            <use href="/assets/icons.svg#google-icon" />
                        </svg>
                        Continue with Google
                    </button>
                </section>

                <Footer />
            </AppLayout>
        );
}
