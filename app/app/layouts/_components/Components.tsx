import { Separator } from '@/components/ui/separator';
import { handwritten, secondaryFont } from '@/config/fonts';
import { cn } from '@/lib/utils';

// Two scrollable areas, side by side, whose height is the same as the parent
export const TwoScrollables = () => {
    return (
        <div className='flex flex-col grow border-0 border-red-500 min-h-0'>
            <div className='border p-2'>header</div>
            <div className='flex w-full grow border h-[85%]'>
                <div className='border overflow-auto flex-1 flex flex-col gap-4'>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                </div>
                <div className='border overflow-auto flex-1 flex flex-col gap-4'>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                    <p>some item</p>
                </div>
            </div>
        </div>
    );
};

type CoverProps = {
    className?: string;
};

export const Cover = ({ className }: CoverProps) => {
    return (
        <div
            className={cn(
                `flex flex-col h-full border border-red-400`,
                className
            )}
        >
            <div className='border mb-2'>The could be the header</div>
            <div className='border my-auto'>
                <p className={`${handwritten.className}`}>
                    This is the content to be centered
                </p>
                <h2 className='font-semibold'>Something cool</h2>
                <p>That takes the main space of the screen</p>
                <p>That takes the space of the screen</p>
                <p>That takes the main space of screen</p>
                <p>That takes the main space the screen</p>
                <p>That takes the main space of the</p>
            </div>
            <div className='border mt-2'>
                This could be something in the footer
            </div>
        </div>
    );
};

type BoxProps = {
    children: React.ReactNode;
    className?: string;
};

const Box = ({ children, className }: BoxProps) => {
    const boxClasses = 'p-2 [&_*]:text-[inherit]';

    return <div className={cn(``, boxClasses, className)}>{children}</div>;
};

type SwitcherProps = {};

export const Switcher = () => {
    const childClasses = 'basis-[calc((var(--threshold)-100%)*999)]';

    return (
        <div className='flex flex-wrap gap-1 [--threshold:600px] relative'>
            {/* flex -> all horizontal | wrap -> allow wrapping */}
            <div className={cn(`grow  border`, childClasses, '')}>
                {/* grow -> take all available space | formula -> very large or negative (and ignored) */}
                Hello
            </div>
            <div
                className={cn(
                    `grow  border`,
                    childClasses,
                    'grow-[2] relative after:absolute after:-top-4 after:-right-2 after:rotate-12 after:text-sm after:text-indigo-600 after:content-["Its_bigger_!!"]'
                )}
            >
                {/* grow -> take all available space | formula -> very large or negative (and ignored) */}
                Hello
            </div>
            <div className={cn(`grow  border`, childClasses, '')}>
                {/* grow -> take all available space | formula -> very large or negative (and ignored) */}
                Hello
            </div>
            <div className={cn(`grow  border`, childClasses, '')}>
                {/* grow -> take all available space | formula -> very large or negative (and ignored) */}
                Hello
            </div>
        </div>
    );
};

type PrimitiveLayoutProps = {
    name: string;
    children: React.ReactNode;
    className?: string;
};

export const PrimitiveLayout = ({
    name,
    children,
    className,
}: PrimitiveLayoutProps) => {
    return (
        <div
            className={cn(
                `border border-primary bg-background p-2 relative before:-z-10 before:absolute before:h-full before:w-full before:border-0 before:border-current flex flex-col`,
                className
            )}
        >
            <h2 className={`${secondaryFont.className} text-2xl font-bold`}>
                {name}
            </h2>
            <Separator className='mb-2' />
            {children}
        </div>
    );
};

type StackProps = {
    children: React.ReactNode;
    className?: string;
    gap?: number;
};

export const Stack = ({ children, className, gap }: StackProps) => {
    const gapClass = `[&_>_*_+_*]:mt-${gap}`;

    return (
        <div className={cn(`flex flex-col ${gapClass}`, className)}>
            {children}
        </div>
    );
};

type WithSidebarProps = {
    children: React.ReactNode;
    className?: string;
};

export const WithSidebar = ({ children, className }: WithSidebarProps) => {
    const sidebarClasses = 'basis-40 grow-[1]';
    const exampleClasses = 'border flex flex-col p-2';

    const noSidebarClasses = 'basis-0 grow-[999] border-2  min-w-[60%]';

    return (
        <div className={cn(`flex flex-wrap`, className)}>
            <div
                className={cn(
                    sidebarClasses,
                    exampleClasses,
                    'border-green-600 border-dotted'
                )}
            >
                Sidebar
            </div>
            <div
                className={cn(
                    noSidebarClasses,
                    exampleClasses,
                    'border-indigo-600'
                )}
            >
                Main Content
            </div>
        </div>
    );
};

// TODO: Learn to whitelist classes. Until then...
const whitelist = [
    '[&_>_*_+_*]:mt-1',
    '[&_>_*_+_*]:mt-2',
    '[&_>_*_+_*]:mt-3',
    '[&_>_*_+_*]:mt-4',
    '[&_>_*_+_*]:mt-5',
    '[&_>_*_+_*]:mt-6',
    '[&_>_*_+_*]:mt-7',
    '[&_>_*_+_*]:mt-8',
    '[&_>_*_+_*]:mt-9',
    '[&_>_*_+_*]:mt-10',
    '[&_>_*_+_*]:mt-12',
    '[&_>_*_+_*]:mt-13',
    '[&_>_*_+_*]:mt-14',
    '[&_>_*_+_*]:mt-16',
    '[&_>_*_+_*]:mt-20',
    '[&_>_*_+_*]:mt-24',
    '[&_>_*_+_*]:mt-28',
    '[&_>_*_+_*]:mt-32',
    '[&_>_*_+_*]:mt-36',
    '[&_>_*_+_*]:mt-40',
    '[&_>_*_+_*]:mt-44',
    '[&_>_*_+_*]:mt-48',
    '[&_>_*_+_*]:mt-52',
    '[&_>_*_+_*]:mt-56',
    '[&_>_*_+_*]:mt-60',
    '[&_>_*_+_*]:mt-64',
    '[&_>_*_+_*]:mt-72',
    '[&_>_*_+_*]:mt-80',
    '[&_>_*_+_*]:mt-96',
];
