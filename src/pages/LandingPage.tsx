import { LandingNav, LandingHero, LandingFeatureCard } from '@/components';
import { AppLayout, Footer } from '@/Layout';
import { useAuth } from '@/hooks';
import { Navigate } from 'react-router-dom';

export function LandingPage() {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) return null;
    if (isAuthenticated) return <Navigate to="/dashboard" replace />;

    const features = [
        {
            icon: (
                <svg className="text-brand text-2xl">
                    <use href="/assets/icons.svg#analytics-icon" />
                </svg>
            ),
            title: 'Powerful analytics',
            description: 'Track clicks in real time and visualize your performance with beautiful analytics.',
        },
        {
            icon: (
                <svg className="text-brand text-2xl">
                    <use href="/assets/icons.svg#qr-icon" />
                </svg>
            ),
            title: 'QR code generation',
            description: 'Generate QR codes, and share with everyone online or offline.',
        },
        {
            icon: (
                <svg className="text-brand text-2xl">
                    <use href="/assets/icons.svg#link-icon" />
                </svg>
            ),
            title: 'Custom links',
            description: 'Create custom short URLs that are easy to remember and share.',
        },
    ];

    return (
        <AppLayout className="m-auto grid h-full max-w-7xl grid-rows-[auto_1fr] gap-10 p-4 md:gap-5 md:p-5">
            <LandingNav className="col-start-1 row-start-1 w-full" />

            <section className="row-start-2 grid gap-10 md:grid-cols-2 md:grid-rows-[5.5fr_2.5fr_1fr] md:gap-5">
                <LandingHero className="grid min-h-100 grid-cols-1 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-2 md:grid-cols-2" />

                <aside className="bg-secondary-surface border-default-border grid w-full grid-cols-1 gap-5 rounded-xl border p-5 sm:grid-cols-2 md:col-start-1 md:col-end-3 md:row-start-2 md:grid-cols-3">
                    {features.map((feature, index) => {
                        const LandingFeatureCardProps = {
                            initial: { y: 5, opacity: 0 },
                            animate: { y: 0, opacity: 1 },
                            transition: {
                                delay: index * 0.1,
                                duration: 0.2,
                                ease: 'linear',
                            },
                        };

                        return (
                            <LandingFeatureCard
                                {...LandingFeatureCardProps}
                                key={index}
                                icon={feature.icon}
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
