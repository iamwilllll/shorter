export function ErrorMessage({ message, type }: { message?: string; type?: 'error' | 'success' }) {
    if (!message) return <div className="h-6" />;

    return (
        <p className={`h-6 px-1 pt-1 text-xs transition-all ${type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
            {message}
        </p>
    );
}
