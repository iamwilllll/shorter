import { LandingNav, LandingHero } from '@/components';

export function LandingPage() {
    return (
        <section className="box-border grid h-screen max-h-screen grid-cols-1 grid-rows-[auto_1fr] place-items-center gap-5 p-5">
            <LandingNav className="col-start-1 row-start-1 w-full" />
            <div className="col-start-1 row-start-2 h-full min-h-0 w-full">
                <LandingHero className="h-full w-full" />
            </div>
        </section>
    );
}
