import { cn } from '@/lib/utils';

type HighlightProps = {
    children: React.ReactNode;
    className?: string;
};

export default function Highlight({ children, className }: HighlightProps) {
    return (
        <span
            className={cn(
                `
      relative
      font-semibold
      text-opacity-100
      [font-size:inherit]
    before:absolute
    before:-left-[2px]
    before:bottom-0
    before:-z-[1]
    before:h-[70%]
    before:w-[calc(100%_+_4px)]
    before:bg-indigo-200
    before:content-['']
    before:[transform:rotate(-2deg)]
                  `,
                className
            )}
        >
            {children}
        </span>
    );
}
