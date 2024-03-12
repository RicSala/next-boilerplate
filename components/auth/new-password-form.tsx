'use client';

// import zod
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newPasswordFormSchema } from '@/schemas/auth-schemas';
import { Message } from './message';
import { newPassword } from '@/actions/auth';
import { useState } from 'react';
import { appConfig } from '@/config/shipper.appconfig';
import { useSearchParams } from 'next/navigation';

export type TNewPasswordSchema = z.infer<typeof newPasswordFormSchema>;

export function NewPasswordForm({}) {
    const form = useForm<TNewPasswordSchema>({
        resolver: zodResolver(newPasswordFormSchema),
        defaultValues: {
            password: '',
        },
    });
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const token = searchParams.get('token');

    const successCard = success && (
        <Message message={success} variant={'success'} />
    );
    const errorCard = error && <Message message={error} variant={'error'} />;

    const onSubmit = async (values: TNewPasswordSchema) => {
        console.log('values', values);
        try {
            const res = await newPassword(values, token);
            setSuccess(res?.success);
            setError(res?.error);
        } catch (error) {}
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nueva contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='******'
                                    type='password'
                                    {...field}
                                    autoComplete='new-password'
                                />
                            </FormControl>
                            <FormDescription>
                                {`Escribe tu nueva contraseña`}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {successCard}
                {errorCard}
                <Button type='submit' disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <div className='flex flex-row gap-2'>
                            Cambiando contraseña
                        </div>
                    ) : (
                        `Cambiar contraseña`
                    )}
                </Button>
            </form>
        </Form>
    );
}
