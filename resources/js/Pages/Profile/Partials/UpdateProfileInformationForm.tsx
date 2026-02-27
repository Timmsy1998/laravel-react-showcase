import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            username: user.username,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-bold text-white">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-slate-300">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="username"
                        value="Username"
                        className="font-semibold text-slate-200"
                    />

                    <TextInput
                        id="username"
                        className="mt-1 block w-full rounded-lg border-slate-700 bg-slate-950/80 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        required
                        isFocused
                        autoComplete="username"
                    />

                    <InputError className="mt-2 text-rose-300" message={errors.username} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" className="font-semibold text-slate-200" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full rounded-lg border-slate-700 bg-slate-950/80 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2 text-rose-300" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4">
                        <p className="text-sm text-cyan-100">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ms-1 text-sm font-semibold text-cyan-200 underline decoration-cyan-500/60 underline-offset-4 transition hover:text-cyan-100"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-emerald-300">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing}
                        className="!rounded-lg !border !border-orange-300/40 !bg-orange-500 !px-5 !py-2.5 !text-xs !font-bold !tracking-[0.18em] !text-orange-950 hover:!bg-orange-400 focus:!bg-orange-400 focus:!ring-orange-300 focus:!ring-offset-0"
                    >
                        Save
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-emerald-300">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
