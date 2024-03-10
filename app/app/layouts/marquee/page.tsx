'use client';

import { range } from '@mantine/hooks';
import {
    InfiniteCarrousel2,
    Item,
} from '../_components/_infinite-carousel/InfiniteCarrousel';
import { Smile } from 'lucide-react';

export default function IdeasPage() {
    return (
        <InfiniteCarrousel2
            inset={2}
            outset={3}
            className='h-[40vh]'
            rotate={1}
        >
            {range(0, 11).map((id) => (
                <Item key={id} id={id} className='h-24'>
                    <div className='flex w-full items-center'>
                        <Smile size={32} className='text-indigo-400' />
                        <h2 className='grow text-center'>Something coll</h2>
                    </div>
                </Item>
            ))}
        </InfiniteCarrousel2>
    );
}
