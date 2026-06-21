import { AppLayout } from '@/layout';
import { CreateUrlForm, UserMenu } from '@/components';

export function Dashboard() {
    return (
        <AppLayout>
            <CreateUrlForm />

            <UserMenu />
        </AppLayout>
    );
}
