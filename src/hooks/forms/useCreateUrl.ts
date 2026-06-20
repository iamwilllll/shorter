import { useState } from 'react';
import { useCreateUrl } from '@/hooks';
import { handleError } from '@/utils';
import type { UrlT } from '@/types';

export function useCreateUrlForm() {
    const { createUrl } = useCreateUrl();

    const [successfulMessage, setSuccessfulMessage] = useState('');
    const [copied, setCopied] = useState(false);

    const handleUrlCreation = async (formData: UrlT) => {
        setSuccessfulMessage('');

        try {
            const response = await createUrl({
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
