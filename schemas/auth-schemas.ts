import { z } from 'zod';

export const signInFormSchema = z.object({
    email: z.string().min(2, {
        message: 'El nombre debe tener al menos dos letras.',
    }),
    password: z.string().min(1, {
        message: 'Se necesita una contraseña',
    }),
});

export const registerFormSchema = z.object({
    email: z.string().min(2, {
        message: 'El nombre debe tener al menos dos letras.',
    }),
    name: z.string().min(2, {
        message: 'El nombre debe tener al menos dos letras.',
    }),
    password: z.string().min(2, {
        message: 'Password must be at least 2 characters.',
    }),
    confirmPassword: z.string().min(2, {
        message: 'Password must be at least 2 characters.',
    }),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const resetPasswordFormSchema = z.object({
    email: z.string().min(2, {
        message: 'El nombre debe tener al menos dos letras.',
    }),
});
export const newPasswordFormSchema = z.object({
    password: z.string().min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres ',
    }),
});
