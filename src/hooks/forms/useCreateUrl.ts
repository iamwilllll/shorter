import { useCreateUrl } from '@/hooks';
import { handleError } from '@/utils';
import type { UrlT, CustomErrorResponse } from '@/types';
import { useLoading } from '@/context';

export function useCreateUrlForm() {
    const { setLoading } = useLoading();
    const { createUrl } = useCreateUrl();

    const handleUrlCreation = async (formData: UrlT): Promise<string | CustomErrorResponse> => {
        try {
            setLoading(true);
            const response = await createUrl({
                ...formData,
                label: formData.label.trim(),
                originalUrl: formData.originalUrl.trim(),
            });

            return response;
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
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
        } finally {
            setLoading(false);
        }
    };

    return { handleUrlCreation, validateURL };
}
