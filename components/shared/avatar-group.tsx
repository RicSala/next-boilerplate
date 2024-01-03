'use client';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const avatarData = [
    {
        name: 'CT',
        imgURL: 'https://randomuser.me/api/portraits/women/79.jpg',
    },
    {
        name: 'CT',
        imgURL: 'https://randomuser.me/api/portraits/med/men/75.jpg',
    },
    {
        name: 'CT',
        imgURL: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
    },
    {
        name: 'CT',
        imgURL: 'https://randomuser.me/api/portraits/men/18.jpg',
    },
    {
        name: 'CT',
        imgURL: 'https://randomuser.me/api/portraits/med/men/36.jpg',
    },
];
export const AvatarGroup = () => (
    <div className='flex items-center justify-center -space-x-2'>
        {avatarData.map((item, idx) => {
            return (
                <Avatar
                    key={idx}
                    className='border-2 border-white h-10 w-10 flex items-center justify-center overflow-hidden rounded-full'
                >
                    <AvatarImage
                        src={item.imgURL}
                        className='h-full w-full object-cover'
                    />
                    <AvatarFallback delayMs={600}>{item.name}</AvatarFallback>
                </Avatar>
            );
        })}
        <p className='text-sm text-gray-500 font-medium translate-x-5'>
            Join 5.000+ users
        </p>
    </div>
);
