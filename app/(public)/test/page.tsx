'use client';
import { auth } from '@/auth';
import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export default function Home() {
    return (
        <div className='gap flex flex-col items-center justify-between'>
            <Button
                onClick={() => {
                    signIn();
                    //     'google', {
                    //     // callbackUrl: "http://localhost:3000/dashboard"
                    // }
                }}
            >
                Button
            </Button>

            <LoginButton mode='modal'>
                <Button>Entrar</Button>
            </LoginButton>
        </div>
    );
}
