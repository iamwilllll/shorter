import { motion } from 'motion/react';

type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
};

export function LandingFeatureCard({ icon, title, description, ...props }: FeatureCardProps) {
    return (
        <motion.article
            className="border-default-border flex w-full flex-col items-center gap-4 rounded-xl border bg-zinc-950/80 p-4 transition-all duration-300 md:max-w-110 md:gap-5 md:p-5"
            {...props}
        >
            <div className="border-default-border bg-brand/10 flex size-14 shrink-0 items-center justify-center rounded-xl border text-xl md:text-2xl lg:size-20">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="text-primary-text mb-2 text-center text-base font-bold wrap-break-word md:text-lg">{title}</h3>
                <p className="text-secondary-text text-center text-sm leading-relaxed wrap-break-word">{description}</p>
            </div>
        </motion.article>
    );
}
