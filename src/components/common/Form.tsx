import { useForm } from 'react-hook-form';
import type { CreateShortUrlT } from '@/types';
import { useShorterForm } from '@/hooks';

function Message({ message, type }: { message?: string; type?: 'error' | 'success' }) {
    if (!message) return <div className="h-6" />;

    return <p className={`h-6 px-1 text-sm ${type === 'success' ? 'text-green-600' : 'text-red-500'}`}>{message}</p>;
}

export function Form({ className }: { className?: string }) {
    const { register, handleSubmit, formState } = useForm<CreateShortUrlT>();
    const { onSubmit, validateURL, handleCopy, copied, errorMessage, successfulMessage } = useShorterForm();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`bg-secondary-surface border-default-border flex w-full flex-col rounded-2xl border p-8 shadow-lg ${className}`}
        >
            <label htmlFor="originalUrl" className="mb-2 text-sm font-medium">
                Original URL
            </label>

            <input
                type="url"
                id="originalUrl"
                placeholder="https://example.com"
                className={`h-14 w-full rounded-xl border px-4 transition-all outline-none ${formState.errors.originalUrl ? 'border-red-500' : 'border-default-border'}`}
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
                className="bg-brand mt-2 h-14 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
                {formState.isSubmitting ? 'Creating...' : 'Create Short URL'}
            </button>

            <div className="mt-5 h-10">
                <div
                    className={`h-full transition-opacity duration-200 ${
                        successfulMessage || errorMessage ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {successfulMessage ? (
                        <div className="flex h-full items-center justify-between gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4">
                            <span className="truncate text-green-600">{successfulMessage}</span>

                            <button type="button" onClick={handleCopy} className="shrink-0 text-sm font-medium underline">
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    ) : (
                        <div className="text-brand border-brand/20 bg-brand/10 flex h-full items-center rounded-xl border px-4">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}
