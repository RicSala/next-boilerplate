'use client';

import { Separator } from '@radix-ui/react-separator';
import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import { config } from '@/config/shipper.config';
import { useSearchParams } from 'next/navigation';

export function Social({}) {
    // get the callbackUrl from query params
    const query = useSearchParams();
    const callbackUrl = query.get('callbackUrl');

    return (
        <div className='flex flex-col items-center space-y-2 w-full'>
            <Separator />
            <h4>También puedes acceder con</h4>
            <Button
                variant='outline'
                className='w-full'
                onClick={async () => {
                    const res = await signIn('google', {
                        callbackUrl:
                            // Send the user to where he was before or the default route
                            callbackUrl || config.routes.defaultLogingRedirect,
                    });
                }}
            >
                {
                    //TODO: review callback después de logearse con google
                }
                Google
            </Button>
            <Button
                variant='outline'
                className='w-full'
                onClick={async () => {
                    const res = await signIn('linkedin', {
                        callbackUrl:
                            // Send the user to where he was before or the default route
                            callbackUrl || config.routes.defaultLogingRedirect,
                    });
                }}
            >
                {
                    //TODO: review callback después de logearse con google
                }
                Linkedin
            </Button>
        </div>
    );
}
