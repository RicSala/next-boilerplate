'use client';

import { cn } from '@/lib/utils';

type ContainerProps = {
    className?: string;
    children: React.ReactNode;
};
const Container = ({ className, children }: ContainerProps) => {
    return (
        <div
            className={cn(
                `
        cont
        mx-auto
        w-full
        max-w-[min(100%,2520px)]
        px-4
        md:px-10
        xl:px-20`,
                className
            )}
        >
            {children}
        </div>
    );
};

export default Container;
