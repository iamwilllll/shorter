import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import type { UrlT } from '@/types';
import { useCreateUrlForm } from '@/hooks';
import { ErrorMessage } from '@/components';
import toast from 'react-hot-toast';
import { useState } from 'react';

function CopyToast({ handleCopy }: { handleCopy: () => void }) {
    const [copied, setCopied] = useState(false);

    const onClick = async () => {
        handleCopy();
        setCopied(true);

        const timer = setTimeout(() => {
            setCopied(false);
        }, 2000);

        clearTimeout(timer);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{
                duration: 0.2,
                ease: 'easeOut',
            }}
            className="border-success/30 bg-success/10 text-primary flex min-w-70 items-center justify-between gap-4 rounded-lg border px-4 py-3 shadow-xl backdrop-blur-md"
        >
            <div className="flex items-center gap-3">
                <svg width="16" height="16" className="text-success">
                    <use href="/assets/icons.svg#check-icon" />
                </svg>

                <div>
                    <p className="text-sm font-semibold">URL created</p>
                    <p className="text-secondary-text text-xs">Your short link is ready to use</p>
                </div>
            </div>

            <button
                type="button"
                onClick={onClick}
                className="hover:bg-default-hover flex h-9 w-9 items-center justify-center rounded-lg transition-all hover:scale-105 active:scale-95"
            >
                <motion.svg
                    key={copied ? 'check' : 'copy'}
                    width="18"
                    height="18"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.15 }}
                >
                    <use href={copied ? '/assets/icons.svg#check-icon' : '/assets/icons.svg#doc-icon'} />
                </motion.svg>
            </button>
        </motion.div>
    );
}

export function CreateUrlForm({ className, ...props }: { className?: string }) {
    const { register, handleSubmit, formState, reset } = useForm<UrlT>({ defaultValues: { originalUrl: '', label: '' } });
    const { handleUrlCreation, validateURL, handleCopy } = useCreateUrlForm();

    const onSubmit = async (data: UrlT) => {
        const response = await handleUrlCreation(data);

        if (response?.error) {
            return toast.error(response.message);
        }

        return toast.custom(<CopyToast handleCopy={handleCopy} />, { duration: 7000 });
        reset();
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
        </motion.form>
    );
}
