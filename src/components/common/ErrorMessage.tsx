type ErrorMessageProps = {
    className?: string;
    message?: string;
    type?: 'error' | 'success';
};

export function ErrorMessage({ className, message, type }: ErrorMessageProps) {
    const textColor = type === 'success' ? 'text-green-600' : 'text-red-500';

    return (
        <p className={`text-xs transition-all ${message ? 'h-5 pt-1 pl-1' : 'hidden'} ${textColor} ${className || ''} `}>
            {message}
        </p>
    );
}
