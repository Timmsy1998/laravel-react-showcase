import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#22d3ee33,transparent_40%),radial-gradient(circle_at_bottom,#f9731633,transparent_40%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#33415522_1px,transparent_1px),linear-gradient(to_bottom,#33415522_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10">
                <header className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300 transition hover:text-cyan-200"
                    >
                        <ApplicationLogo className="h-10 w-10 fill-current text-cyan-300" />
                        Gaming Realm
                    </Link>
                    <Link
                        href="/"
                        className="rounded-lg border border-cyan-300/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-200 transition hover:border-cyan-200 hover:text-cyan-100"
                    >
                        Back to Home
                    </Link>
                </header>

                <main className="flex flex-1 items-center justify-center py-12">
                    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/75 px-6 py-7 shadow-2xl shadow-cyan-500/10 backdrop-blur sm:px-8 sm:py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
