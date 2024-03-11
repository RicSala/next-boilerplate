'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { LoginForm } from './login-form';
import { SwitchLink } from './switch-link';
import { AuthCard } from './AuthCard';
import { config } from '@/config/shipper.config';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

type LoginButtonProps = {
    mode: 'modal' | 'redirect';
    children: React.ReactNode;
};

export function LoginButton({ mode, children }: LoginButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const closeDialog = () => {
        setIsOpen(false);
    };

    if (mode === 'redirect')
        return (
            <span
                onClick={() => {
                    signIn();
                }}
            >
                {children}
            </span>
        );

    if (mode === 'modal') console.log('modal');
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <AuthCard onAuth={closeDialog} />
            </DialogContent>
        </Dialog>
    );
}
