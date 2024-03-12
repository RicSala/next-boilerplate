export const metadata = {
    title: 'Sign In - Mosaic',
    description: 'Page description',
};

import Link from 'next/link';
import AuthHeader from '../auth-header';
import AuthImage from '../auth-image';
import { LoginForm } from '@/components/auth/login-form';
import { Message } from '@/components/auth/message';
import { SwitchLink } from '@/components/auth/switch-link';

export default function SignIn() {
    return (
        <main className='bg-white dark:bg-slate-900'>
            <div className='relative md:flex'>
                {/* Content */}
                <div className='md:w-1/2'>
                    <div className='min-h-[100dvh] h-full flex flex-col after:flex-1'>
                        <AuthHeader />

                        <div className='max-w-sm mx-auto w-full px-4 py-8'>
                            {/* Form */}
                            <LoginForm />
                            {/* Footer */}
                            <SwitchLink
                                signUp
                                resetPassword
                                className='space-y-4 mt-4'
                            />
                        </div>
                    </div>
                </div>

                <AuthImage />
            </div>
        </main>
    );
}
