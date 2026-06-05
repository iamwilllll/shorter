import { useForm, type SubmitHandler } from 'react-hook-form';
import type { CreateShortUrlT } from '../types';
import { useCreateShortUrl } from '../hooks';

function ErrorMessage({ message }: { message?: string }) {
    return <p className="">{message}</p>;
}

export function Form() {
    const { createShortUrl } = useCreateShortUrl();
    const { register, handleSubmit, formState } = useForm<CreateShortUrlT>();

    const onSubmit: SubmitHandler<CreateShortUrlT> = async (formData) => {
        const savedURL = await createShortUrl(formData);
        if (savedURL) {
            console.log('URL was shorter successful ' + savedURL);
        }
    };

    const validateURL = (value: string) => {
        try {
            const url = new URL(value);

            if (!['http:', 'https:'].includes(url.protocol)) {
                return 'Only accept HTTP or HTTPS';
            }

            return true;
        } catch {
            return 'Invalid URL';
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    id="originalUrl"
                    className="border"
                    {...register('originalUrl', { required: 'URL is required', validate: validateURL })}
                />
                <ErrorMessage message={formState.errors.originalUrl?.message} />

                <input
                    type="text"
                    id="label"
                    className="border"
                    {...register('label', {
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
                <ErrorMessage message={formState.errors.label?.message} />

                <button type="submit">submit</button>
            </form>
        </div>
    );
}
