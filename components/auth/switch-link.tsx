'use client';
import { appConfig } from '@/config/shipper.config';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type SwitchLinkProps = {
    signIn?: boolean;
    signUp?: boolean;
    resetPassword?: boolean;
    className?: string;
};

export function SwitchLink({
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
                    <Link
                        className='font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                        href={`${signup}?${query.toString()}`}
                    >
                        Regístrate
                    </Link>
                </div>
            )}
            {resetPassword && (
                <div className='text-sm'>
                    ¿Has olvidado tu contraseña?{' '}
                    <Link
                        className='font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                        href={`${recover}?${query.toString()}`}
                    >
                        Recupérala
                    </Link>
                </div>
            )}
            {signIn && (
                <div className='text-sm'>
                    ¿Ya tienes cuenta?{' '}
                    <Link
                        className='font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                        href={`${signin}?${query.toString()}`}
                    >
                        Entra
                    </Link>
                </div>
            )}
        </div>
    );
}
