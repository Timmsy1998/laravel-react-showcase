import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#22d3ee30,transparent_40%),radial-gradient(circle_at_bottom,#f9731633,transparent_40%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#3341551f_1px,transparent_1px),linear-gradient(to_bottom,#3341551f_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative mx-auto min-h-screen w-full max-w-6xl px-6 py-6 sm:py-8">
                <nav className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 shadow-2xl shadow-cyan-500/10 backdrop-blur sm:px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300 transition hover:text-cyan-200"
                            >
                                <ApplicationLogo className="h-9 w-9 fill-current text-cyan-300" />
                                Gaming Realm
                            </Link>

                            <div className="hidden items-center gap-2 sm:flex">
                                <Link
                                    href={route('dashboard')}
                                    className={
                                        'rounded-lg px-3 py-2 text-sm font-semibold transition ' +
                                        (route().current('dashboard')
                                            ? 'bg-cyan-500/20 text-cyan-100'
                                            : 'text-slate-300 hover:bg-slate-800 hover:text-cyan-200')
                                    }
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('profile.edit')}
                                    className={
                                        'rounded-lg px-3 py-2 text-sm font-semibold transition ' +
                                        (route().current('profile.*')
                                            ? 'bg-cyan-500/20 text-cyan-100'
                                            : 'text-slate-300 hover:bg-slate-800 hover:text-cyan-200')
                                    }
                                >
                                    Profile
                                </Link>
                            </div>
                        </div>

                        <div className="hidden items-center gap-4 sm:flex">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-white">
                                    {user.username}
                                </p>
                                <p className="text-xs text-slate-400">{user.email}</p>
                            </div>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="rounded-lg border border-orange-300/40 bg-orange-500 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-950 transition hover:bg-orange-400"
                            >
                                Log out
                            </Link>
                        </div>

                        <div className="sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-200"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' pt-4 sm:hidden'}>
                        <div className="space-y-2 border-t border-slate-700 pt-4">
                            <Link
                                href={route('dashboard')}
                                className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-cyan-200"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={route('profile.edit')}
                                className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-cyan-200"
                            >
                                Profile
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="mt-2 w-full rounded-lg border border-orange-300/40 bg-orange-500 px-4 py-2 text-left text-xs font-bold uppercase tracking-[0.16em] text-orange-950 transition hover:bg-orange-400"
                            >
                                Log out
                            </Link>
                        </div>

                        <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2">
                            <p className="text-sm font-semibold text-white">{user.username}</p>
                            <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                    </div>
                </nav>

                {header && <header className="pt-8">{header}</header>}

                <main className="py-8">{children}</main>
            </div>
        </div>
    );
}
