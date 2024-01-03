import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface FormErrorProps extends VariantProps<typeof messageVariants> {
    message: string | null;
    className?: string;
}

const messageVariants = cva(
    'rounded-md flex items-center gap-x-2 text-sm border p-3',
    {
        variants: {
            variant: {
                warning:
                    'bg-yellow-400/10 text-yellow-600 border-yellow-400/20 border-l-4 border-l-yellow-400/50',
                error: 'bg-destructive/10 text-destructive border-destructive/20 border-l-4 border-l-destructive/50',
                success:
                    'bg-emerald-400/10 text-emerald-400 border-emerald-400/20 border-l-4 border-l-emerald-400/50',
            },
        },

        defaultVariants: {
            variant: 'warning',
        },
    }
);

export function Message({ message, className, variant }: FormErrorProps) {
    if (!message) return null;
    const icon = (() => {
        switch (variant) {
            case 'error':
                return <AlertTriangle className='w-5 h-5' />;
            case 'success':
                return <CheckCircle className='w-5 h-5' />;
            default:
                return <AlertTriangle className='w-5 h-5' />;
        }
    })();

    return (
        <div className={cn(messageVariants({ variant, className }))}>
            {icon}
            <p>{message}</p>
        </div>
    );
}
