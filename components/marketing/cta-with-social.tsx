import { cn } from '@/lib/utils';
import { GiftIcon } from 'lucide-react';
import { Button } from '../ui/button';

type CtaWithSocialProps = {
    accentText: string;
    primaryText: string;
    buttonLabel: string;
    buttonClasses?: string;
    spamClasses?: string;
    iconClasses?: string;
};
export default function CtaWithSocial({
    accentText,
    primaryText,
    buttonLabel,
    buttonClasses,
    spamClasses,
    iconClasses,
}: CtaWithSocialProps) {
    return (
        <div className='flex flex-col gap-2 '>
            <Button
                className={cn(
                    `
                        
                        `,
                    buttonClasses
                )}
            >
                {buttonLabel}
            </Button>
            <div>
                <p className='flex items-center justify-center gap-2 text-sm'>
                    <GiftIcon className='animate-bounce text-teal-500' />
                    <span className='text-teal-500'>
                        {accentText}
                        &nbsp;
                        <span className='text-primary'>{primaryText}</span>
                    </span>
                </p>
            </div>
        </div>
    );
}
