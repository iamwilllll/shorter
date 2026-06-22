import { useForm, useWatch } from 'react-hook-form';
import { useSignup } from '@/hooks';
import { ErrorMessage } from '@/components';
import { type SignupFormT } from '@/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function SignUpForm() {
    const navigate = useNavigate();
    const { handleEmailAndPasswordSignup, handleGoogleSignup } = useSignup();

    const { register, handleSubmit, control, formState } = useForm<SignupFormT>();
    const password = useWatch({ control, name: 'password' });

    const onSubmit = async (data: SignupFormT) => {
        const response = await handleEmailAndPasswordSignup(data);

        if (response?.error) {
            return toast.error(response.message);
        }

        toast.success('We sent a verification email to your email address, please check your spam folder.', { duration: 5000 });
        navigate('/signin');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
            <div>
                <label className="text-secondary-text mb-2 block text-sm" htmlFor="username">
                    Username
                </label>
                <input
                    id="username"
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
                <label className="text-secondary-text mb-2 block text-sm" htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className="border-default-border bg-primary-surface w-full rounded-lg border px-4 py-3 outline-none"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Please enter a valid email address',
                        },
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
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                        },
                    })}
                />

                <ErrorMessage message={formState.errors.password?.message} />
            </div>

            <div>
                <label className="text-secondary-text mb-2 block text-sm" htmlFor="repeat_password">
                    Confirm Password
                </label>
                <input
                    id="repeat_password"
                    type="password"
                    className="border-default-border bg-primary-surface w-full rounded-lg border px-4 py-3 outline-none"
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) => value === password || 'Passwords do not match',
                    })}
                />

                <ErrorMessage message={formState.errors.confirmPassword?.message} />
            </div>

            <button
                type="submit"
                disabled={formState.isSubmitting}
                className="bg-brand text-on-brand hover:bg-brand/50 flex w-full items-center justify-center rounded-lg py-3 font-medium transition"
            >
                {formState.isSubmitting ? 'Creating account...' : 'Create account'}
            </button>

            <div className="flex w-full items-center">
                <div className="border-default-border h-px w-full border-t"></div>
                <p className="text-secondary-text my-5 px-5 text-center text-sm">OR</p>
                <div className="border-default-border h-px w-full border-t"></div>
            </div>

            <button
                onClick={handleGoogleSignup}
                type="button"
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
