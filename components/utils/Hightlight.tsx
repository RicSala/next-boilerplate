import { cn } from '@/lib/utils';

type HighlightProps = {
    children: React.ReactNode;
    className?: string;
    color?: HighlightColors;
};

const hightlightColorMap = {
    green: 'bg-[linear-gradient(to_right,_rgb(0_255_171_/_10%),_rgb(0_255_46_/_70%)_4%,_rgb(0_255_125_/_30%)_)]',
    yellow: 'bg-[linear-gradient(to_right,_rgb(255_255_0_/_10%),_rgb(255_255_0_/_70%)_4%,_rgb(255_255_0_/_30%)_)]',
    red: 'bg-[linear-gradient(to_right,_rgb(255_0_0_/_10%),_rgb(255_0_0_/_70%)_4%,_rgb(255_0_0_/_30%)_)]',
    blue: 'bg-[linear-gradient(to_right,_rgb(0_0_255_/_10%),_rgb(0_0_255_/_70%)_4%,_rgb(0_0_255_/_30%)_)]',
    purple: 'bg-[linear-gradient(to_right,_rgb(255_0_255_/_10%),_rgb(255_0_255_/_70%)_4%,_rgb(255_0_255_/_30%)_)]',
};

type HighlightColors = keyof typeof hightlightColorMap;

export default function Highlight({
    children,
    color = 'yellow',
    className,
}: HighlightProps) {
    return (
        <mark
            className={cn(
                `px-[0.4em] py-[0.1em] -mx-[0.4em] rounded-[0.8em_0.3em] bg-transparent  box-decoration-clone
            [-webkit-box-decoration-break:clone]`,
                hightlightColorMap[color],
                className
            )}
        >
            {children}
        </mark>
    );
}
