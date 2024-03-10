'use client';
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
    const signUpUrl = `/auth/signup?${query.toString()}`;
    const signInUrl = `/auth/signin?${query.toString()}`;
    const resetPasswordUrl = `/auth/reset-password?${query.toString()}`;

    return (
        <div className={cn(``, className)}>
            {signUp && (
                <div className='text-sm'>
                    ¿No tienes cuenta?{' '}
                    <Link
                        className='font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'
                        href={signUpUrl}
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
                        href={resetPasswordUrl}
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
                        href={signInUrl}
                    >
                        Entra
                    </Link>
                </div>
            )}
        </div>
    );
}
