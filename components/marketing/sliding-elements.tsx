import { cn } from '@/lib/utils';

const elements = [
    '###FIRST###',
    'Get more followers',
    'Save time',
    'Save time',
    'Save time',
    'Increase your productivity',
    'Get more engagement',
    '### LAST ###',
];

type SlidingElementsProps = {
    elements: string[];
    direction?: 'left' | 'right';
};

export const SlidingElements = () => {
    return (
        <section className='w-[100vw] flex flex-col items-center gap-8'>
            <h2 className=''>Todo lo que necesitas</h2>
            <div
                className='flex flex-col gap-8 items-center justify-center w-full
             relative
            '
            >
                <SlidingRow elements={elements} direction='left' />
                <SlidingRow elements={elements} direction='right' />
            </div>
        </section>
    );
};

function SlidingRow({ elements, direction }: SlidingElementsProps) {
    return (
        <div
            className='
            flex
            w-full
                overflow-hidden

            relative
            before:content-[" "]
            before:absolute
            before:top-0
            before:left-0
            before:z-10
            before:bg-gradient-to-r
            before:from-white
            before:to-transparent
            before:w-[50px]
            before:md:w-[150px]
            before:lg:w-[200px]
            before:h-full


            after:content-[" "]
            after:absolute
            after:top-0
            after:right-0
            after:z-10
            after:bg-gradient-to-l
            after:from-white
            after:to-transparent
            after:w-[50px]
            after:md:w-[150px]
            after:lg:w-[200px]
            after:h-full
            '
        >
            <div className='flex'>
                <ul
                    className={`
                        flex
                    relative
                    min-w-fit
                    will-change-transform
                    ${
                        direction === 'left'
                            ? 'animate-slide-left'
                            : 'animate-slide-right'
                    }
                    `}
                >
                    {elements.map((element, index) => {
                        return (
                            <li key={index} className='ml-8'>
                                <Element label={element} className='text-sm' />
                            </li>
                        );
                    })}
                </ul>
                <ul
                    className={`
                        flex
                    relative
                    min-w-fit
                    will-change-transform
                    ${
                        direction === 'left'
                            ? 'animate-slide-left'
                            : 'animate-slide-right'
                    }
                    `}
                >
                    {elements.map((element, index) => {
                        return (
                            <li key={index} className='ml-8'>
                                <Element label={element} className='text-sm' />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

type ElementProps = {
    label: string;
    className: string;
};
const Element = ({ label, className }: ElementProps) => {
    return (
        <div
            className={cn(
                `bg-slate-500/25 rounded-full p-5 whitespace-nowrap box-border inline-block`,
                className
            )}
        >
            {label}
        </div>
    );
};
