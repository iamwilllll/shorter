import { useNavigate } from 'react-router-dom';
import { Button } from '@/components';

type AppIconProps = {
    className?: string;
};

export function AppIcon({ className, ...props }: AppIconProps) {
    const navigate = useNavigate();

    return (
        <Button
            className={`flex items-center gap-1.5 bg-transparent hover:bg-transparent md:px-0 ${className || ''}`}
            onClick={() => navigate('/')}
            {...props}
        >
            <svg className="text-brand shrink-0">
                <use href="/assets/icons.svg#shorter-icon" />
            </svg>

            <h2 className="truncate text-2xl leading-none font-bold whitespace-nowrap text-white">Shorter</h2>
        </Button>
    );
}
