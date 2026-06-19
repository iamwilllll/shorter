import { AppLayout, Footer } from '@/layout';
import { LandingNav, SigninForm } from '@/components';

export function Signin() {
    return (
        <AppLayout className="m-auto grid h-full max-w-7xl grid-rows-[auto_1fr] gap-10 p-4 md:gap-5 md:p-5">
            <LandingNav />

            <section className="bg-secondary-surface border-default-border mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-lg border p-5 md:max-w-150 md:p-10">
                <div className="mb-8">
                    <h1 className="text-primary-text text-center text-3xl font-bold">Welcome back</h1>
                    <p className="text-secondary-text mt-2 text-center">Sign in to manage your short links and analytics.</p>
                </div>

                <SigninForm />
            </section>

            <Footer />
        </AppLayout>
    );
}
