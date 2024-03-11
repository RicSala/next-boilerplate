'use client';

import { cn } from '@/lib/utils';
import { TAuthCardViews } from '@/types/types';
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Social } from './social';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { ResetPasswordForm } from './reset-password-form';
import { Separator } from '../ui/separator';
import { SwitchLink } from './switch-link';
import { SwitchState } from './switchState';
import { Header } from '../shared/header';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

type AuthCardProps = {
    initialView?: TAuthCardViews;
    className?: string;
    showSocial?: boolean;
    onAuth?: () => void;
};
export function AuthCard({
    initialView = 'signin',
    className,
    showSocial,
    onAuth,
}: AuthCardProps) {
    const [view, setView] = useState<TAuthCardViews>(initialView);
    const pathName = usePathname();

    const setViewToSignin = () => setView('signin');
    const setViewToSignup = () => setView('signup');
    const setViewToRecover = () => setView('recover');
    const { data } = useSession();
    if (data?.user)
        return (
            <Card
                className={cn(`max-w-[350] border-none shadow-none`, className)}
            >
                <CardHeader>
                    <Header label='Ya estás logeado' />
                </CardHeader>
                <CardContent></CardContent>
            </Card>
        );

    const cardContent =
        view === 'signin' ? (
            <LoginForm isRedirected={false} onAuth={onAuth} />
        ) : view === 'signup' ? (
            <RegisterForm
                isRedirected={false}
                callbackUrl={pathName}
                onAuth={onAuth}
            />
        ) : view === 'recover' ? (
            <ResetPasswordForm />
        ) : null;

    const cardHeaderText =
        view === 'signin'
            ? 'Bienvenid@ ✨'
            : view === 'signup'
            ? 'Crea tu cuenta ✨'
            : view === 'recover'
            ? 'Recupera tu contraseña 📩'
            : '';

    return (
        <Card className={cn(`max-w-[350] border-none shadow-none`, className)}>
            <CardHeader>
                <Header label={cardHeaderText} className='text-center' />
                <Separator />
            </CardHeader>
            <CardContent>{cardContent}</CardContent>
            <CardFooter className='flex-col'>
                {showSocial && (
                    <>
                        <Separator />
                        <Social />
                    </>
                )}
                <SwitchState
                    signUp={view === 'signin' ? setViewToSignup : undefined}
                    signIn={view === 'signup' ? setViewToSignin : undefined}
                    resetPassword={
                        view === 'signin' ? setViewToRecover : undefined
                    }
                />
            </CardFooter>
        </Card>
    );
}
