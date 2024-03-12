'use server';

import { TResetPasswordSchema } from '@/components/auth/reset-password-form';
import {
    newPasswordFormSchema,
    resetPasswordFormSchema,
} from '@/schemas/auth-schemas';
import { getUserByEmail } from './getUser';
import { db } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { sendPasswordResetEmail } from '@/lib/email';
import { TNewPasswordSchema } from '@/components/auth/new-password-form';
import bcrypt from 'bcryptjs';

export const resetPassword = async (values: TResetPasswordSchema) => {
    const validatedFields = resetPasswordFormSchema.safeParse(values);

    if (!validatedFields.success)
        return {
            error: 'Email no válido',
        };

    const { email } = validatedFields.data;

    const user = await getUserByEmail(email);
    console.log({ user });

    // If the user is not in the db, we still send success because we don't wanna give any clue.
    if (!user)
        return {
            success:
                'Si tu email está dado de alta, habrás recibido un email nuestro',
        };

    const passwordResetToken = await generatePasswordResetToken(email);
    sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return {
        success:
            'Si tu email está dado de alta, habrás recibido un email nuestro',
    };
};

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordToken = await db.passwordResetToken.findFirst({
            where: {
                email,
            },
        });

        return passwordToken;
    } catch {
        return null;
    }
};

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const passwordToken = await db.passwordResetToken.findUnique({
            where: {
                token,
            },
        });

        return passwordToken;
    } catch {
        return null;
    }
};

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now

    // Check if there's already a token for this email and delete it
    const existitingToken = await getPasswordResetTokenByEmail(email);

    if (existitingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existitingToken.id,
            },
        });
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return passwordResetToken;
};

export const newPassword = async (
    values: TNewPasswordSchema,
    token: string | null
) => {
    if (!token) return { error: 'Token no válido' };

    const validatedFields = newPasswordFormSchema.safeParse(values);

    if (!validatedFields.success) return { error: 'Contraseña no válida' };

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) return { error: 'Token no válido' };

    const hasExpired = new Date() > existingToken.expires;

    if (hasExpired) return { error: 'Token expirado' };

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) return { error: 'Usuario no encontrado' };

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {
            id: existingUser.id,
        },
        data: {
            hashedPassword,
        },
    });

    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    return { success: 'Contraseña actualizada' };
};
