import { motion } from 'motion/react';

type FeatureCardProps = {
    title: string;
    description: string;
    iconHref: string;
    index: number;
};

export function LandingFeatureCard({ title, description, iconHref, index, ...props }: FeatureCardProps) {
    return (
        <motion.article
            className="border-default-border flex w-full flex-col items-center gap-4 rounded-lg border bg-zinc-950/80 p-4 transition-all duration-300 md:max-w-110 md:flex-row md:items-start md:gap-5 md:p-5"
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                delay: index * 0.1,
                duration: 0.2,
                ease: 'linear',
            }}
            {...props}
        >
            <div className="border-default-border bg-brand/10 flex size-14 shrink-0 items-center justify-center rounded-lg border text-xl md:text-2xl lg:size-20">
                <svg className="text-brand text-2xl">
                    <use href={iconHref} />
                </svg>
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="text-primary-text mb-2 text-center text-base font-bold wrap-break-word md:text-start md:text-lg">
                    {title}
                </h3>
                <p className="text-secondary-text text-center text-sm leading-relaxed wrap-break-word md:text-start">
                    {description}
                </p>
            </div>
        </motion.article>
    );
}
