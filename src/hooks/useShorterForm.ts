import { type SubmitHandler } from 'react-hook-form';
import type { CreateShortUrlT } from '@/types';
import { useCreateShortUrl } from '.';
import { useState } from 'react';

export function useShorterForm() {
    const { createShortUrl } = useCreateShortUrl();

    const [successfulMessage, setSuccessfulMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [copied, setCopied] = useState(false);

    const onSubmit: SubmitHandler<CreateShortUrlT> = async (formData) => {
        setSuccessfulMessage('');
        setErrorMessage('');
        let savedURL = '';

        try {
            savedURL = await createShortUrl({
                ...formData,
                label: formData.label.trim(),
                originalUrl: formData.originalUrl.trim(),
            });
        } catch (err) {
            console.error((err as Error).message);
            setErrorMessage('Failed to create short URL');
        }

        if (savedURL) {
            setSuccessfulMessage(savedURL);
        }
    };

    const validateURL = (value: string) => {
        try {
            const url = new URL(value);

            if (!['http:', 'https:'].includes(url.protocol)) {
                return 'Only HTTP and HTTPS URLs are allowed';
            }

            return true;
        } catch {
            return 'Invalid URL';
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(successfulMessage);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return { onSubmit, validateURL, handleCopy, successfulMessage, errorMessage, copied };
}
