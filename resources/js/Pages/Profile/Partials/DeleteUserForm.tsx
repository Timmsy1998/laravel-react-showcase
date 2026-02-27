import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-bold text-rose-200">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-slate-300">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <DangerButton
                onClick={confirmUserDeletion}
                className="!rounded-lg !border !border-rose-300/40 !bg-rose-500 !px-5 !py-2.5 !text-xs !font-bold !tracking-[0.18em] !text-rose-950 hover:!bg-rose-400 focus:!ring-rose-300 focus:!ring-offset-0"
            >
                Delete Account
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 text-slate-100">
                    <h2 className="text-lg font-bold text-rose-200">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-slate-300">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-full rounded-lg border-slate-700 bg-slate-950/80 text-slate-100 placeholder:text-slate-500 focus:border-rose-400 focus:ring-rose-400 sm:w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2 text-rose-300"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton
                            onClick={closeModal}
                            className="!rounded-lg !border !border-slate-600 !bg-slate-800 !text-slate-100 hover:!bg-slate-700 focus:!ring-cyan-400 focus:!ring-offset-0"
                        >
                            Cancel
                        </SecondaryButton>

                        <DangerButton
                            className="ms-3 !rounded-lg !border !border-rose-300/40 !bg-rose-500 !text-rose-950 hover:!bg-rose-400 focus:!ring-rose-300 focus:!ring-offset-0"
                            disabled={processing}
                        >
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
