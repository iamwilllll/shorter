import { useNavigate } from 'react-router-dom';
import { Button } from '../components';

export function AuthNav({ ...props }) {
    const navigate = useNavigate();

    return (
        <div className="flex gap-4">
            <Button
                fn={() => navigate('/login')}
                className={`border-default-border border bg-transparent hover:bg-transparent`}
                label="Log in"
                {...props}
            />
            <Button fn={() => navigate('/signup')} label="Sign up" {...props} />
        </div>
    );
}
