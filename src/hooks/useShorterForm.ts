import type { CreateShortUrlT } from '@/types';
import { useCreateShortUrl } from '.';
import { useState } from 'react';
import { handleError } from '@/utils';

export function useShorterForm() {
    const { createShortUrl } = useCreateShortUrl();

    const [successfulMessage, setSuccessfulMessage] = useState('');
    const [copied, setCopied] = useState(false);

    const handleUrlCreation = async (formData: CreateShortUrlT) => {
        setSuccessfulMessage('');

        try {
            const response = await createShortUrl({
                ...formData,
                label: formData.label.trim(),
                originalUrl: formData.originalUrl.trim(),
            });

            setSuccessfulMessage(response);
        } catch (err) {
            return handleError(err);
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

    return { handleUrlCreation, validateURL, handleCopy, successfulMessage, copied };
}
