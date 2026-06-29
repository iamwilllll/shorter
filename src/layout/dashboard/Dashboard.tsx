import { AppLayout, DashboardNav, DashboardHeader, Footer } from '@/layout';

type DashboardProps = {
    className?: string;
    children?: React.ReactNode;
};

export function Dashboard({ className, children }: DashboardProps) {
    return (
        <AppLayout className={`grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] ${className}`}>
            <DashboardNav className="col-start-1 col-end-2 row-start-1 row-end-4" />
            <DashboardHeader />

            <section className="col-start-2 row-start-2 overflow-y-auto p-5">{children}</section>

            <Footer className="col-start-2 col-end-3 row-start-3 md:m-0 md:mt-2.5 md:p-0 md:px-5" />
        </AppLayout>
    );
}
