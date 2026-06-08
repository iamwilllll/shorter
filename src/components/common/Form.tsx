import { useForm } from 'react-hook-form';
import type { CreateShortUrlT } from '@/types';
import { useShorterForm } from '@/hooks';

function Message({ message, type }: { message?: string; type?: 'error' | 'success' }) {
    if (!message) return <div className="h-6" />;

    return <p className={`h-6 px-1 text-sm ${type === 'success' ? 'text-green-600' : 'text-red-500'}`}>{message}</p>;
}

export function Form() {
    const { register, handleSubmit, formState } = useForm<CreateShortUrlT>();
    const { onSubmit, validateURL, handleCopy, copied, errorMessage, successfulMessage } = useShorterForm();

    return (
        <section className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-transparent to-slate-500/5 px-4">
            <div className="mb-10 text-center">
                <h1 className="mb-3 text-5xl font-black">Shoter</h1>

                <p className="text-tertiary-text max-w-md">A fast and simple URL shortener that works across all devices.</p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-secondary-surface border-default-border flex w-full max-w-xl flex-col rounded-2xl border p-8 shadow-lg"
            >
                <label htmlFor="originalUrl" className="mb-2 text-sm font-medium">
                    Original URL
                </label>

                <input
                    type="url"
                    id="originalUrl"
                    placeholder="https://example.com"
                    className={`border-default-border h-14 w-full rounded-xl border px-4 transition-all outline-none`}
                    {...register('originalUrl', {
                        required: 'URL is required',
                        validate: validateURL,
                    })}
                />

                <Message message={formState.errors.originalUrl?.message} />

                <label htmlFor="label" className="mt-2 mb-2 text-sm font-medium">
                    Custom Label
                </label>

                <div
                    className={`flex h-14 overflow-hidden rounded-xl border transition-all ${
                        formState.errors.label ? 'border-red-500' : 'border-default-border'
                    }`}
                >
                    <div className="text-tertiary-text flex items-center border-r px-4 text-sm whitespace-nowrap">shorter/</div>

                    <input
                        type="text"
                        id="label"
                        placeholder="my-link"
                        className="w-full px-4 outline-none"
                        {...register('label', {
                            required: 'Label is required',
                            pattern: {
                                value: /^[a-zA-Z0-9-_]+$/,
                                message: 'Only letters, numbers, hyphens and underscores are allowed',
                            },
                            minLength: {
                                value: 3,
                                message: 'Minimum 3 characters',
                            },
                            maxLength: {
                                value: 50,
                                message: 'Maximum 50 characters',
                            },
                        })}
                    />
                </div>

                <Message message={formState.errors.label?.message} />

                <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="bg-brand mt-4 h-14 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {formState.isSubmitting ? 'Creating...' : 'Create Short URL'}
                </button>

                {successfulMessage && (
                    <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                        <span className="truncate text-green-600">{successfulMessage}</span>

                        <button type="button" onClick={handleCopy} className="shrink-0 text-sm font-medium underline">
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                )}

                {errorMessage && (
                    <p className="text-brand border-brand/20 bg-brand/10 mt-5 flex w-full items-center justify-between gap-3 truncate rounded-xl border p-2 text-center">
                        {errorMessage}
                    </p>
                )}
            </form>
        </section>
    );
}
