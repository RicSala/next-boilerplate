// Find more fonts at https://fonts.google.com/?vfonly=true

import { Bricolage_Grotesque, Inter, Indie_Flower } from 'next/font/google';

export const primaryFont = Inter({ subsets: ['latin'] });

export const secondaryFont = Bricolage_Grotesque({
    subsets: ['latin'],
    variable: '--font-grotesque',
    display: 'swap',
});

export const handwritten = Indie_Flower({
    subsets: ['latin'],
    variable: '--font-grotesque',
    display: 'swap',
    weight: ['400'],
});

// ### FONTS I LIKE ###
// ### HANDWRITTEN
// Indie Flower
// Caveat
