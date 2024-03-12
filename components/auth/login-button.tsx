'use client';

import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { AuthCard } from './AuthCard';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

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
                <AuthCard onAuth={closeDialog} showSocial={true} />
            </DialogContent>
        </Dialog>
    );
}
