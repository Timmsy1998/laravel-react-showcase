import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const stats = [
    { label: 'Active Guilds', value: '24', delta: '+12%' },
    { label: 'Open Quests', value: '87', delta: '+5%' },
    { label: 'Live Tournaments', value: '6', delta: '+2' },
    { label: 'XP Awarded Today', value: '18.4k', delta: '+9%' },
];

const activity = [
    { name: 'Friday Night Arena', state: 'Live', players: 134 },
    { name: 'Guild Sprint Challenge', state: 'Queueing', players: 58 },
    { name: 'Raid Boss Rotation', state: 'Starts in 40m', players: 212 },
];

export default function Dashboard() {
    const {
        props: {
            auth: { user },
        },
    } = usePage<PageProps>();

    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-2">
                    <p className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-200">
                        Command Center
                    </p>
                    <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                        Welcome back, {user.username}
                    </h1>
                    <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
                        Monitor realm health, track engagement, and keep events moving.
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="space-y-6">
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <article
                            key={stat.label}
                            className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-xl shadow-cyan-500/10 backdrop-blur"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                {stat.label}
                            </p>
                            <p className="mt-3 text-3xl font-black text-white">{stat.value}</p>
                            <p className="mt-2 text-xs font-semibold text-emerald-300">
                                {stat.delta}
                            </p>
                        </article>
                    ))}
                </section>

                <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <article className="rounded-2xl border border-white/10 bg-slate-900/75 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white">Live Activity</h2>
                            <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                                Real-time
                            </span>
                        </div>
                        <div className="mt-4 space-y-3">
                            {activity.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3"
                                >
                                    <div>
                                        <p className="font-semibold text-slate-100">{item.name}</p>
                                        <p className="text-xs text-slate-400">{item.players} players</p>
                                    </div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-200">
                                        {item.state}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="rounded-2xl border border-white/10 bg-slate-900/75 p-6 shadow-2xl shadow-orange-500/10 backdrop-blur">
                        <h2 className="text-lg font-bold text-white">Progress Pulse</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-300">
                                    <span>Season Battle Pass</span>
                                    <span>72%</span>
                                </div>
                                <div className="h-2 rounded-full bg-slate-800">
                                    <div className="h-2 w-[72%] rounded-full bg-gradient-to-r from-cyan-400 to-orange-400" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-300">
                                    <span>Guild Recruitment Goal</span>
                                    <span>48%</span>
                                </div>
                                <div className="h-2 rounded-full bg-slate-800">
                                    <div className="h-2 w-[48%] rounded-full bg-gradient-to-r from-cyan-400 to-orange-400" />
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-300">
                                    <span>Event Completion Rate</span>
                                    <span>89%</span>
                                </div>
                                <div className="h-2 rounded-full bg-slate-800">
                                    <div className="h-2 w-[89%] rounded-full bg-gradient-to-r from-cyan-400 to-orange-400" />
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
