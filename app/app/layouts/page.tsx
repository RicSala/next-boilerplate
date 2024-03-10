'use client';
import { Separator } from '@/components/ui/separator';
import { handwritten, secondaryFont } from '@/config/fonts';
import { cn, range } from '@/lib/utils';
import { ArrowDown, ArrowUp, Asterisk, Smile } from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import { Grid } from './grid';
import {
    InfiniteCarrousel2,
    Item,
} from './_components/_infinite-carousel/InfiniteCarrousel';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
    Cover,
    PrimitiveLayout,
    Stack,
    Switcher,
    TwoScrollables,
    WithSidebar,
} from './_components/Components';
import Highlight from '@/components/utils/Hightlight';
import Image from 'next/image';

const Placeholder = ({
    children,
    className,
}: {
    children?: ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn(`border border-border rounded-md p-2`, className)}>
            Placeholder
            {children}
        </div>
    );
};

export default function IdeasPage() {
    return (
        <div className='grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 grid-cols-1 gap-16 p-8'>
            <PrimitiveLayout name='The Reel'>
                <p className={`${handwritten.className} text-indigo-600`}></p>
                <div className='border flex gap-2 overflow-x-scroll w-1/2 mx-auto p-2'>
                    {range(0, 10).map((id, index) => (
                        <div
                            key={index}
                            className='h-20 w-20 flex justify-center items-center border p-2'
                        >
                            ITEM
                        </div>
                    ))}
                </div>
                <p
                    className={`${handwritten.className} text-indigo-600 mx-auto`}
                >
                    We can also apply scroll snapping
                </p>
                <div className='border flex gap-2 overflow-x-scroll w-1/2 mx-auto p-2 snap-x snap-mandatory'>
                    {range(0, 10).map((id, index) => (
                        <div
                            key={index}
                            className='h-20 w-20 flex justify-center items-center border p-2 snap-center'
                        >
                            ITEM
                        </div>
                    ))}
                </div>
            </PrimitiveLayout>
            <PrimitiveLayout name='The Frame'>
                <p className={`${handwritten.className} text-indigo-600`}>
                    Once we set width to 100%, the height is determined by the
                    aspect ratio of the content. <Highlight>REVIEW</Highlight>
                </p>
                <div className='border aspect-[10/1] relative overflow-hidden'>
                    <div className='bg-gray-500 w-48 h-64 absolute -top-12 left-0'>
                        <p>a</p>
                        <p>b</p>
                        <p>c</p>
                        <p>d</p>
                        <p>e</p>
                        <p>f</p>
                    </div>
                </div>
            </PrimitiveLayout>
            <PrimitiveLayout name='Two Scrollables' className='h-[300px]'>
                <TwoScrollables />
            </PrimitiveLayout>
            <PrimitiveLayout name='The Cover'>
                <p></p>
                <div className='h-[400px] border-indigo-500 border overflow-y-auto'>
                    <Cover className='border' />
                </div>
            </PrimitiveLayout>
            <PrimitiveLayout name='The Real Grid' className=''>
                <GridExample />
            </PrimitiveLayout>
            <PrimitiveLayout name='The Switcher' className=''>
                <SwitcherExample />
            </PrimitiveLayout>

            <PrimitiveLayout name='The Box'>
                <div
                    className={`${handwritten.className} text-indigo-600 border border-border`}
                >
                    Box role is to take care of any {''}
                    <Highlight>
                        styles that can be considered intrinsic
                    </Highlight>{' '}
                    to ind. elements, the ones that are not dictated, inherited
                    or inferred from the environment.
                    <ul>
                        <li>Margin: Induced by context</li>
                        <li>
                            Width and height: also inferred (expl. flex-basis,
                            flex-grow and flexshrink or imp. by content)
                        </li>
                        <li>
                            `Padding should be equal on all sides, because diff.
                            padding means it`s not a box``
                        </li>
                    </ul>
                </div>
                <p>This is a box</p>
                <p>and inside</p>
                <p>there is something super cool</p>
            </PrimitiveLayout>
            <PrimitiveLayout name='The Cluster'>
                <Stack gap={2}>
                    <p className='text-primary/70'>
                        No need to create a primitive for this...
                    </p>
                    <div className='flex flex-wrap gap-2 border border-dotted p-2 relative'>
                        <div className='absolute -top-8 -right-8 rotate-12 bg-white bg-opacity-70 p-1 rounded-full border border-indigo-200'>
                            <p
                                className={`${handwritten.className} text-indigo-600 text-sm`}
                            >
                                This is one cluster
                            </p>
                        </div>
                        <div className='border border-border p-2'>hello</div>
                        <div className='border border-border p-2'>hello</div>
                        <div className='border border-border p-2 mb-auto'>
                            hello
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-2 border border-dotted p-2 relative w-1/2'>
                        <div className='absolute -top-8 -right-8 rotate-12 bg-white bg-opacity-70 p-1 rounded-full border border-indigo-200'>
                            <p
                                className={`${handwritten.className} text-indigo-600 text-sm`}
                            >
                                This one needed to wrap!
                            </p>
                        </div>
                        <div className='border border-border p-2'>
                            hello world
                        </div>
                        <div className='border border-border p-2'>
                            hello world
                        </div>
                        <div className='border border-border p-2 mb-auto'>
                            hello world
                        </div>
                        <div className='border border-border p-2'>
                            hello world
                        </div>
                        <div className='border border-border p-2 mb-auto'>
                            hello world
                        </div>
                    </div>
                    <div className='relative flex flex-col flex-wrap gap-2 border p-2 border-dotted'>
                        <div className='absolute -top-8 -left-8 -rotate-12 bg-white bg-opacity-70 p-1 rounded-full border border-indigo-200'>
                            <p
                                className={`${handwritten.className} text-indigo-600 text-sm`}
                            >
                                This is another cluster
                            </p>
                        </div>
                        <div className='border border-border p-2'>hello</div>
                        <div className='border border-border p-2'>hello</div>
                        <div className='border border-border p-2 mb-auto'>
                            hello
                        </div>
                    </div>
                </Stack>
            </PrimitiveLayout>

            <PrimitiveLayout name='The Stack'>
                <Stack
                    gap={4}
                    //  REVIEW: This is how you can add border to the top of the elements in the stack
                    className='border border-border p-2 h-72 [&_>_*_+_*]:border-t'
                >
                    <div className='border border-black px-2'>Hello</div>
                    <div className='relative px-2'>
                        happy
                        <div className='absolute translate-y-0.5 left-0'>
                            <div className='text-xs flex items-center'>
                                <div>
                                    <ArrowUp />
                                    <ArrowDown />
                                </div>
                                <div>!mt-auto</div>
                            </div>
                        </div>
                    </div>
                    <div className='border border-black px-2 !mt-auto relative'>
                        <Stack gap={2} className='border border-indigo-600 p-2'>
                            <p>Split child</p>
                            <div className='border border-black  px-2'>
                                Hello
                            </div>
                            <div className='border border-black  px-2'>
                                happy
                            </div>
                        </Stack>
                    </div>
                    <div className='border border-black px-2'>World</div>
                </Stack>
            </PrimitiveLayout>
            <PrimitiveLayout name='The Sidebar'>
                <WithSidebar className='h-72'>This is not used</WithSidebar>
            </PrimitiveLayout>
            <h2>From here, they are not `primitives`</h2>
            <PrimitiveLayout
                name='Basic header + main + fixed footer'
                className=''
            >
                <NavBodySidebarBecomesFooter />
            </PrimitiveLayout>
            <PrimitiveLayout name='Basic header + main + footer' className=''>
                <NavBodyFooter />
            </PrimitiveLayout>
            <PrimitiveLayout name='The infinite carrousel relative'>
                <InfiniteCarouselExample />
            </PrimitiveLayout>
        </div>
    );
}

const NavBodySidebarBecomesFooter = () => {
    return (
        <div className='BODY! h-[200px] border-2 border-yellow-400 border-dashed'>
            <div
                className='CONT
            min-h-full
            flex flex-wrap-reverse
            '
            >
                <aside
                    className='sidebar border border-red-500
                    grow shrink-0 basis-[200px] self-end
            '
                >
                    This is a sidebar
                </aside>
                <main
                    className='main
                border border-blue-600
                grow-[999] min-w-[60%]
                '
                >
                    This is the main section
                </main>
            </div>
        </div>
    );
};

const NavBodyFooter = () => {
    return (
        <div className='BODY! h-[200px] border-2 border-yellow-400 border-dashed'>
            <div className='h-full border-4 border-green-600 flex flex-col overflow-auto'>
                <header className='border-red-500 border sticky top-0'>
                    This is the header
                </header>
                <main className='border border-blue-600 flex-grow'>
                    <p className='mb-4'>something</p>
                    <p className='mb-4'>something</p>
                    <p className='mb-4'>something</p>
                    <p className='mb-4'>something</p>
                    <p className='mb-4'>something</p>
                    <p className='mb-4'>something</p>
                </main>
                <footer className='border-yellow-500 border'>Footer</footer>
            </div>
        </div>
    );
};

const InfiniteCarouselExample = () => {
    const [rotate, setRotate] = useState<number>(1);
    const [speed, setSpeed] = useState<number>(10);

    return (
        <>
            <InfiniteCarrousel2
                inset={2}
                outset={3}
                className='h-[40vh]'
                rotate={rotate}
                speed={speed}
            >
                {range(0, 12).map((id) => (
                    <Item key={id} id={id} className='h-24'>
                        <div className='flex w-full items-center'>
                            <Smile size={32} className='text-indigo-400' />
                            <h2 className='grow text-center'>Something coll</h2>
                        </div>
                    </Item>
                ))}
            </InfiniteCarrousel2>
            <div className='absolute h-10 w-10 top-10 right-2'>
                <Popover>
                    <PopoverTrigger>
                        <Asterisk className='h-full w-full text-indigo-600 z-10' />
                    </PopoverTrigger>
                    <PopoverContent className='flex flex-col gap-4'>
                        <div className='flex gap-2'>
                            <Label>Rotate</Label>
                            <Slider
                                min={0}
                                max={9}
                                value={[rotate]}
                                onValueChange={(value) => {
                                    setRotate(value[0]);
                                }}
                            />
                        </div>
                        <div className='flex gap-2'>
                            <Label>Speed</Label>
                            <Slider
                                min={0}
                                max={50}
                                step={1}
                                value={[speed]}
                                onValueChange={(value) => {
                                    setSpeed(value[0]);
                                }}
                            />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </>
    );
};

const GridExample = () => {
    return (
        <>
            <div className='relative'>
                <Grid
                    gridClassName='grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))]'
                    className='gap-2 [align-items:start] bg-muted '
                >
                    <Placeholder className='border-indigo-600 border-dashed bg-background' />
                    <Placeholder className='bg-background'>
                        <p>Bigger one!</p>
                    </Placeholder>
                    <Placeholder className='bg-background h-full' />
                    <Placeholder className='bg-background' />
                </Grid>
                <Grid
                    gridClassName='grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))]'
                    className='gap-2 bg-[rgba(0,0,0,0.05)] [background-opacity:40%] absolute z-10 w-full top-0'
                >
                    <Placeholder className=' bg-[rgba(254,254,254,0.53)] rounded-none border-pink-600 border-dotted relative'>
                        <div
                            className={`absolute ${handwritten.className} text-indigo-600 text-sm -bottom-4 z-10`}
                        >
                            <p>
                                <ArrowUp className='h-4 w-4 animate-bounce' />
                                Smaller one!
                            </p>
                        </div>
                    </Placeholder>
                    <Placeholder className='bg-background  rounded-none border-pink-600 border-dotted'>
                        <p>Bigger one!</p>
                    </Placeholder>
                    <Placeholder className='bg-background  rounded-none border-pink-600 border-dotted' />
                    <Placeholder className='bg-background  rounded-none border-pink-600 border-dotted' />
                </Grid>
            </div>
        </>
    );
};

const SwitcherExample = () => {
    return (
        <>
            <div className='rounded-sm bg-yellow-600 bg-opacity-40 text-secondary absolute inset-0 m-auto z-30 w-fit h-fit text-1xl -rotate-12 p-2'>
                <p>TO BE CONTINUED!</p>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='border-indigo-500 border border-dashed p-2 rounded-sm relative'>
                    <Switcher />
                    <div
                        className={`${handwritten.className} text-indigo-600 absolute -top-10 right-3 rotate-12`}
                    >
                        <p>We can go from this...</p>
                    </div>
                </div>
                <div className='max-w-md border-indigo-500 border border-dashed p-2 rounded-sm relative'>
                    <div
                        className={`${handwritten.className} text-indigo-600 absolute bottom-10 -left-32 -rotate-12 z-30`}
                    >
                        <p>...to this, without using meadia queries!</p>
                    </div>
                    <Switcher />
                </div>
            </div>
        </>
    );
};
