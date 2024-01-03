import { TooltipArrow } from '@radix-ui/react-tooltip';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';

type ExplanationProps = {
    message: string;
    className?: string;
};

export function Explanation({ message, className }: ExplanationProps) {
    return (
        <span>
            <TooltipProvider>
                <Tooltip delayDuration={200}>
                    <TooltipTrigger className='text-xs text-pink-600 font-bold cursor-help translate-x-1/4 -translate-y-1'>
                        ?
                    </TooltipTrigger>
                    <TooltipContent>{message}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </span>
    );
}
