import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
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
                        Pilot Settings
                    </p>
                    <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                        Profile Control
                    </h1>
                    <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
                        Manage identity, account security, and recovery controls.
                    </p>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="space-y-6">
                <section className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-xl shadow-cyan-500/10 backdrop-blur sm:p-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Username
                            </p>
                            <p className="mt-2 text-lg font-bold text-white">{user.username}</p>
                        </div>
                        <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Email
                            </p>
                            <p className="mt-2 truncate text-sm font-medium text-slate-200">
                                {user.email}
                            </p>
                        </div>
                        <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                Verification
                            </p>
                            <p className="mt-2 text-sm font-semibold text-cyan-200">
                                {user.email_verified_at ? 'Verified' : 'Pending'}
                            </p>
                        </div>
                    </div>
                </section>

                <div className="space-y-6">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-xl shadow-cyan-500/10 backdrop-blur sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-xl shadow-cyan-500/10 backdrop-blur sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-xl shadow-rose-500/10 backdrop-blur sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
