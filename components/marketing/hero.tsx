'use client';

import { cn } from '@/lib/utils';
import { Video } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';

export default function Hero({ className = '' }) {
    return (
        <section
            className={cn(
                `
                    flex flex-col items-center gap-2 lg:flex-row
                    `,
                className
            )}
        >
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='mx-auto max-w-2xl text-center'>
                    <h1 className='font-inter px-6 text-lg text-base-muted-content'>
                        Smart email campaign builder, made for Developers
                    </h1>
                    <p className='font-pj mt-5 text-4xl font-bold leading-tight text-base-content sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight'>
                        Turn your visitors into profitable
                        <span className='relative inline-flex sm:inline'>
                            <span className='absolute inset-0 h-full w-full bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-30 blur-lg filter'></span>
                            <span className='relative'> business </span>
                        </span>
                    </p>

                    <div className='mt-9 flex flex-wrap items-center justify-center gap-5 px-8 sm:space-x-5 sm:px-0'>
                        <Button
                            className='flex shadow-xl'
                            onClick={() => {
                                signIn('google');
                            }}
                        >
                            Get more customers
                        </Button>

                        <Button variant='outline'>
                            <Video />
                            Watch free demo
                        </Button>
                    </div>

                    <p className='font-inter mt-8 text-base text-base-muted-content'>
                        60 Days free trial · No credit card required
                    </p>
                </div>
            </div>

            <div className='overflow-hidden rounded-lg'>
                <div className='mx-auto object-contain lg:mx-auto lg:max-w-6xl'>
                    <Image
                        className='mx-auto'
                        width={700}
                        height={700}
                        src='https://cdn.rareblocks.xyz/collection/clarity/images/hero/2/illustration.png'
                        alt=''
                    />
                </div>
            </div>
        </section>
    );
}
