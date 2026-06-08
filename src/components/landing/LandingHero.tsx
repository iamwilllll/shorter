import { motion } from 'motion/react';
import { Form, LandingFeatureCard } from '@/components';

type LandingHeroProps = {
    className?: string;
};

export function LandingHero({ className, ...props }: LandingHeroProps) {
    return (
        <motion.section className={`md:grid md:grid-cols-2 md:grid-rows-[5.5fr_2.5fr_1fr] ${className}`} {...props}>
            <motion.section className="m-auto md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2 md:max-w-130">
                <motion.div
                    className="relative mb-5 flex w-fit justify-center overflow-hidden rounded-full p-px"
                    transition={{ opacity: { duration: 1.5 } }}
                >
                    <motion.div
                        className="via-brand absolute inset-0 top-1/2 size-60 -translate-y-1/2 rounded-full bg-conic from-transparent to-transparent"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />

                    <p className="bg-primary-surface text-brand relative rounded-full px-2 py-1 text-center text-sm font-light">
                        Fast. Simple. Powerful.
                    </p>
                </motion.div>

                <h1 className="text-primary-text mb-5 text-4xl font-bold md:text-5xl">
                    Shorten Links,
                    <br /> share <span className="text-brand">everywhere.</span>
                </h1>

                <p className="text-secondary-text text-md">
                    Shorter is a fast and accessible URLs shortener that work across all devices. Track click, generate QR codes
                    and manage your links in one place.
                </p>
            </motion.section>

            <Form className="m-auto max-w-130 md:col-span-1 md:col-start-2 md:row-start-1 md:row-end-2" />

            <LandingFeatureCard
                icon={<span className="text-2xl">🔗</span>}
                title="Fast and Simple"
                description="Shorter makes it easy to create short URLs in seconds."
            />
        </motion.section>
    );
}
