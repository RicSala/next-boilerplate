import { cn } from '@/lib/utils';

type CardHeaderProps = {
    label: string;
    className?: string;
};

export function Header({ label, className }: CardHeaderProps) {
    return (
        <h1
            className={cn(
                `text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6`,
                className
            )}
        >
            {label}
        </h1>
    );
}
