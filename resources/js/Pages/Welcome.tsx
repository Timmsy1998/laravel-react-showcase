import { Head, Link, usePage } from '@inertiajs/react';

const features = [
    {
        title: 'Event Ops',
        description: 'Launch tournaments, ladders, and weekly match cycles from one place.',
    },
    {
        title: 'Team Hubs',
        description: 'Manage rosters, member roles, and progression history for every guild.',
    },
    {
        title: 'Progression Rewards',
        description: 'Drive retention with rank tracks, unlockables, and achievement milestones.',
    },
];

type WelcomeProps = {
    canLogin: boolean;
    canRegister: boolean;
    laravelVersion: string;
    phpVersion: string;
};

export default function Welcome({
    canLogin,
    canRegister,
    laravelVersion,
    phpVersion,
}: WelcomeProps) {
    const page = usePage();
    const isAuthenticated = Boolean((page.props as { auth?: { user?: unknown } }).auth?.user);

    return (
        <>
            <Head title="Gaming Realm" />
            <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#22d3ee33,transparent_40%),radial-gradient(circle_at_bottom,#f9731633,transparent_40%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#33415522_1px,transparent_1px),linear-gradient(to_bottom,#33415522_1px,transparent_1px)] bg-[size:40px_40px]" />

                <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10">
                    <header className="flex items-center justify-between">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                            Gaming Realm
                        </p>
                        <nav className="flex items-center gap-3">
                            {isAuthenticated ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-orange-950 transition hover:bg-orange-400"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    {canLogin && (
                                        <Link
                                            href={route('login')}
                                            className="rounded-lg border border-cyan-300/40 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-200"
                                        >
                                            Log in
                                        </Link>
                                    )}
                                    {canRegister && (
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-orange-950 transition hover:bg-orange-400"
                                        >
                                            Join now
                                        </Link>
                                    )}
                                </>
                            )}
                        </nav>
                    </header>

                    <main className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr]">
                        <section>
                            <p className="mb-3 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-200">
                                Realm Management Platform
                            </p>
                            <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl">
                                Run your next
                                <span className="block bg-gradient-to-r from-cyan-300 to-orange-300 bg-clip-text text-transparent">
                                    competitive gaming realm
                                </span>
                            </h1>
                            <p className="mt-5 max-w-xl text-base text-slate-300 sm:text-lg">
                                Coordinate events, teams, and progression from a single command
                                center built for modern online communities.
                            </p>
                        </section>

                        <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur">
                            <h2 className="text-xl font-bold text-white">Core Modules</h2>
                            <ul className="mt-4 space-y-4">
                                {features.map((feature) => (
                                    <li
                                        key={feature.title}
                                        className="rounded-xl border border-slate-700 bg-slate-900/80 p-4"
                                    >
                                        <p className="font-semibold text-cyan-200">
                                            {feature.title}
                                        </p>
                                        <p className="mt-1 text-sm text-slate-300">
                                            {feature.description}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </main>

                    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-400">
                        <p>Laravel v{laravelVersion}</p>
                        <p>PHP v{phpVersion}</p>
                    </footer>
                </div>
            </div>
        </>
    );
}
