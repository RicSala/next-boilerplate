import { db } from '@/lib/prisma';

export const getUserByEmail = async (email: string) => {
    return await db.user.findUnique({
        where: {
            email,
        },
    });
};
