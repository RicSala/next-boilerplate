// Ref: https://play.tailwindcss.com/Bfv1yH2IIo
//

'use client';

import { range } from '@mantine/hooks';
import styles from './styles.module.css';
import { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

type InfiniteCarrouselProps = {
    children: React.ReactNode;
    speed?: number; // Time it takes to complete the animation
    transition?: number; // Time it takes for the active item to "pop up"
    rotate?: number;
    buffer?: number;
    inset?: number; // From where to start, in xtimes its height below the natural position
    outset?: number; // To where to end, in xtimes its height below the natural position
    overflow?: boolean;
    className?: string;
};

export function InfiniteCarrousel2({
    children,
    speed = 40,
    transition = 0.15,
    rotate = 1,
    buffer = 5,
    // With the below values, we can controle where the animation starts and ends
    inset = 1, // From where to start the animation in rem distance from 100% below the natural position
    outset = 4, // To where to end the animation in x times its height??
    overflow = false,
    className,
}: InfiniteCarrouselProps) {
    return (
        <>
            <div
                className={cn(`h-64`, className, `${styles.window}`)}
                style={
                    {
                        '--speed': `${speed}s`,
                        '--transition': `${transition}s`,
                        '--rotate': `${rotate}`,
                        '--buff': `${buffer}rem`,
                        '--inset': `${inset}`,
                        '--outset': `${outset}`,
                    } as CSSProperties
                }
            >
                <div
                    className={styles.scene}
                    style={
                        {
                            mask: `${!overflow ? '' : 'unset'}`,
                        } as CSSProperties
                    }
                >
                    <ul className={styles.grid}>{children}</ul>
                </div>
            </div>
        </>
    );
}

type ItemProps = {
    id: number;
    className?: string;
    children?: React.ReactNode;
};

export const Item = ({ id, className, children }: ItemProps) => {
    const index = Math.floor(id / 2);
    return (
        <li
            className={cn(``, className, styles.litem)}
            style={
                {
                    '--index': `${index}`,
                } as CSSProperties
            }
        >
            <div className={styles.item}>{children}</div>
        </li>
    );
};

export const ItemExample = () => {
    return (
        <>
            <div className={`w-6 text-indigo-500`}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-6 h-6'
                >
                    <path
                        fillRule='evenodd'
                        d='M17.834 6.166a8.25 8.25 0 1 0 0 11.668.75.75 0 0 1 1.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0 1 21.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 1 1-.82-6.26V8.25a.75.75 0 0 1 1.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 0 0-2.416-5.834ZM15.75 12a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z'
                        clipRule='evenodd'
                    />
                </svg>
            </div>
            <div className={`flex-1 text-center`}>Something cool</div>;
        </>
    );
};
