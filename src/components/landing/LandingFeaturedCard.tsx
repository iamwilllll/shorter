type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
};

export function LandingFeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <article className="border-default-border flex h-fit w-full max-w-110 gap-5 rounded-xl border bg-zinc-950/80 p-5 transition-all duration-300">
            <div className="border-default-border bg-brand/10 flex size-20 shrink-0 items-center justify-center rounded-xl border text-2xl">
                {icon}
            </div>

            <div className="min-w-0">
                <h3 className="text-primary-text truncate-none mb-2 text-lg font-bold wrap-break-word">{title}</h3>
                <p className="text-secondary-text text-sm leading-relaxed wrap-break-word">{description}</p>
            </div>
        </article>
    );
}
