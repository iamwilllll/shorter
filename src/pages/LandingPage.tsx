import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { AppLayout, Footer } from '@/layout';
import { LandingNav, LandingHero, LandingFeatureCard } from '@/components';

export function LandingPage() {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) return null;
    if (isAuthenticated) return <Navigate to="/dashboard" replace />;

    const features = [
        {
            icon: '/assets/icons.svg#analytics-icon',
            title: 'Powerful analytics',
            description: 'Track clicks in real time and visualize your performance with beautiful analytics.',
        },
        {
            icon: '/assets/icons.svg#qr-icon',
            title: 'QR code generation',
            description: 'Generate QR codes, and share with everyone online or offline.',
        },
        {
            icon: '/assets/icons.svg#link-icon',
            title: 'Custom links',
            description: 'Create custom short URLs that are easy to remember and share.',
        },
    ];

    return (
        <AppLayout className="grid grid-rows-[auto_1fr] gap-10 md:gap-5">
            <LandingNav className="col-start-1 row-start-1 w-full" />

            <section className="row-start-2 grid gap-10 md:grid-cols-2 md:grid-rows-[5.5fr_2.5fr_1fr] md:gap-5">
                <LandingHero className="grid min-h-100 grid-cols-1 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-2 md:grid-cols-2" />

                <aside className="bg-secondary-surface border-default-border grid w-full grid-cols-1 gap-5 rounded-lg border p-5 sm:grid-cols-2 md:col-start-1 md:col-end-3 md:row-start-2 md:grid-cols-3">
                    {features.map((feature, index) => {
                        return (
                            <LandingFeatureCard
                                key={index}
                                index={index}
                                iconHref={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        );
                    })}
                </aside>

                <Footer className="md:col-start-1 md:col-end-3 md:row-start-3" />
            </section>
        </AppLayout>
    );
}
