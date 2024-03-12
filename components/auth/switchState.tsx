'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { appConfig } from '@/config/shipper.config';

type SwitchLinkProps = {
    signIn?: () => void;
    signUp?: () => void;
    resetPassword?: () => void;
    className?: string;
};

export function SwitchState({
    signIn,
    signUp,
    resetPassword,
    className,
}: SwitchLinkProps) {
    // get all the query params
    const query = useSearchParams();
    const { signin, signup, reset: recover } = appConfig.routes.auth;

    return (
        <div className={cn(``, className)}>
            {signUp && (
                <div className='text-sm'>
                    ¿No tienes cuenta?{' '}
                    <Button
                        variant={'link'}
                        className='font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                        onClick={signUp}
                    >
                        Regístrate
                    </Button>
                </div>
            )}
            {resetPassword && (
                <div className='text-sm'>
                    ¿Has olvidado tu contraseña?{' '}
                    <Button
                        variant={'link'}
                        className='font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                        onClick={resetPassword}
                    >
                        Recuperala
                    </Button>
                </div>
            )}
            {signIn && (
                <div className='text-sm'>
                    ¿Ya tienes cuenta?{' '}
                    <Button
                        variant={'link'}
                        className='font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                        onClick={signIn}
                    >
                        Entra
                    </Button>
                </div>
            )}
        </div>
    );
}
