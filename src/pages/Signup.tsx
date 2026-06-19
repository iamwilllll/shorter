import { useForm, useWatch } from 'react-hook-form';
import { ErrorMessage, LandingNav } from '@/components';
import { AppLayout, Footer } from '@/layout';
import { useAuth, useSignup } from '@/hooks';
import { Navigate } from 'react-router-dom';
import { type SignupFormT } from '@/types';
import { useState } from 'react';

export function Signup() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { handleEmailAndPasswordSignup, handleGoogleSignup } = useSignup();
    const { isAuthenticated, isLoading } = useAuth();

    const { register, handleSubmit, control, formState } = useForm<SignupFormT>();
    const password = useWatch({
        control,
        name: 'password',
    });

    if (isLoading) return null;
    if (isAuthenticated) return <Navigate to="/" replace />;

    const onSubmit = async (data: SignupFormT) => {
        const response = await handleEmailAndPasswordSignup(data);

        if (response?.error) {
            setErrorMessage(response.message);
        }
    };

    return (
        <AppLayout className="m-auto grid h-full max-w-7xl grid-rows-[auto_1fr] gap-10 p-4 md:gap-5 md:p-5">
            <LandingNav />

            <section className="bg-secondary-surface border-default-border mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-lg border p-5 md:max-w-150 md:p-10">
                <div className="mb-8">
                    <h1 className="text-primary-text text-center text-3xl font-bold">Create account</h1>

                    <p className="text-secondary-text mt-2 text-center">Start shortening links and tracking analytics.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
                    <div>
                        <label className="text-secondary-text mb-2 block text-sm">Username</label>

                        <input
                            type="text"
                            className="border-default-border bg-primary-surface w-full rounded-lg border px-4 py-3 outline-none"
                            {...register('username', {
                                required: 'Username is required',
                                minLength: {
                                    value: 3,
                                    message: 'Username must be at least 3 characters',
                                },
                            })}
                        />

                        <ErrorMessage message={formState.errors.username?.message} />
                    </div>

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
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                        />

                        <ErrorMessage message={formState.errors.password?.message} />
                    </div>

                    <div>
                        <label className="text-secondary-text mb-2 block text-sm">Confirm Password</label>

                        <input
                            type="password"
                            className="border-default-border bg-primary-surface w-full rounded-lg border px-4 py-3 outline-none"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: (value) => value === password || 'Passwords do not match',
                            })}
                        />

                        <ErrorMessage message={formState.errors.confirmPassword?.message} />
                    </div>

                    {errorMessage && <ErrorMessage message={errorMessage} className="w-full sm:p-0 sm:text-[14px]" />}

                    <button
                        type="submit"
                        disabled={formState.isSubmitting}
                        className="bg-brand text-on-brand hover:bg-brand/50 flex w-full items-center justify-center rounded-lg py-3 font-medium transition"
                    >
                        {formState.isSubmitting ? 'Creating account...' : 'Create account'}
                    </button>
                </form>

                <p className="text-secondary-text my-5 text-sm">OR</p>

                <button
                    onClick={handleGoogleSignup}
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
