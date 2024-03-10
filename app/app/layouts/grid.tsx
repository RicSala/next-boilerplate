'use client';

import { cn } from '@/lib/utils';

type GridProps = {
    gridClassName: GridColsType;
    className?: string;
    children?: React.ReactNode;
    minWidth?: string;
};

type GridColsType =
    `grid-cols-[repeat(auto-fit,minmax(min(${string},100%),1fr))]`;

/**
 * ClassNameOnResize is the class name that will be applied to the grid when the window is resized.
 * @example grid-cols-[repeat(auto-fit,minmax(min(0.25rem,100%),1fr))]
 * @example Where 0.25 is the minimum width of the grid item on screens that have enough space to fit 2 items per row.
 */
export function Grid({ className, gridClassName, children }: GridProps) {
    return (
        <div
            className={cn(
                `grid grid-cols-[repeat(auto-fit,minmax(min(100px,100%),1fr))]`,
                className,
                gridClassName
            )}
        >
            {children}
        </div>
    );
}
