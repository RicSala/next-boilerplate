'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { LoginForm } from './login-form';
import { SwitchLink } from './switch-link';

type LoginButtonProps = {
    mode: 'modal' | 'redirect';
    children: React.ReactNode;
};

export function LoginButton({ mode, children }: LoginButtonProps) {
    const router = useRouter();

    if (mode === 'redirect')
        return (
            <span
                onClick={() => {
                    router.push(`/auth/signin`);
                }}
            >
                {children}
            </span>
        );

    if (mode === 'modal') console.log('modal');
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <>
                    <LoginForm />
                    <SwitchLink signUp resetPassword />
                </>
            </DialogContent>
        </Dialog>
    );
}
