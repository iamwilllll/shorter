import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import type { UrlT } from '@/types';
import { useCreateUrlForm } from '@/hooks';
import { ErrorMessage } from '@/components';

export function CreateUrlForm({ className, ...props }: { className?: string }) {
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { register, handleSubmit, formState } = useForm<UrlT>();
    const { handleUrlCreation, validateURL, handleCopy, copied, successfulMessage } = useCreateUrlForm();

    const onSubmit = async (data: UrlT) => {
        setErrorMessage('');
        const response = await handleUrlCreation(data);

        if (response?.error) {
            setErrorMessage(response.message);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className={`bg-secondary-surface border-default-border flex w-full flex-col gap-4 rounded-lg border p-8 shadow-xl backdrop-blur-sm ${className || ''}`}
            {...props}
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="originalUrl" className="text-secondary-text mb-2 text-sm font-medium tracking-wide">
                    Original URL
                </label>

                <input
                    type="url"
                    id="originalUrl"
                    placeholder="https://example.com"
                    className={`h-12 w-full rounded-lg border px-4 text-sm transition-all outline-none focus:ring-2 ${
                        formState.errors.originalUrl
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-default-border focus:border-brand focus:ring-brand/20'
                    }`}
                    {...register('originalUrl', {
                        required: 'URL is required',
                        validate: validateURL,
                    })}
                />
                <ErrorMessage message={formState.errors.originalUrl?.message} />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="label" className="text-secondary-text mb-2 text-sm font-medium tracking-wide">
                    Custom Label
                </label>

                <div
                    className={`flex h-12 overflow-hidden rounded-lg border transition-all focus-within:ring-2 ${
                        formState.errors.label
                            ? 'border-red-500/50 focus-within:border-red-500 focus-within:ring-red-500/20'
                            : 'border-default-border focus-within:border-brand focus-within:ring-brand/20'
                    }`}
                >
                    <div className="text-tertiary-text bg-default-hover/30 flex items-center border-r px-4 text-sm font-medium whitespace-nowrap">
                        shorter/
                    </div>

                    <input
                        type="text"
                        id="label"
                        placeholder="my-link"
                        className="w-full bg-transparent px-4 text-sm outline-none"
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

                <ErrorMessage message={formState.errors.label?.message} />
            </div>
            <button
                type="submit"
                disabled={formState.isSubmitting}
                className="bg-brand h-12 rounded-lg text-sm font-semibold text-white shadow-sm transition-all hover:opacity-95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 [@media(hover:hover)]:hover:scale-[1.01]"
            >
                {formState.isSubmitting ? 'Creating...' : 'Create Short URL'}
            </button>

            <div className="h-12">
                <div
                    className={`h-full transform transition-all duration-300 ${
                        successfulMessage || errorMessage
                            ? 'translate-y-0 opacity-100'
                            : 'pointer-events-none translate-y-1 opacity-0'
                    }`}
                >
                    {successfulMessage ? (
                        <div className="flex h-full items-center justify-between gap-3 rounded-lg border border-green-500/20 bg-green-500/5 px-4 shadow-inner">
                            <span className="truncate text-sm font-medium text-green-600">{successfulMessage}</span>

                            <button
                                type="button"
                                onClick={handleCopy}
                                className="shrink-0 text-xs font-semibold text-green-700 underline transition-colors hover:text-green-800"
                            >
                                {copied ? (
                                    <svg>
                                        <use href="/assets/icons.svg#check-icon" />
                                    </svg>
                                ) : (
                                    <svg>
                                        <use href="/assets/icons.svg#doc-icon" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="text-brand border-brand/20 bg-brand/5 flex h-full items-center rounded-lg border px-4 text-sm font-medium shadow-inner">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
        </motion.form>
    );
}
