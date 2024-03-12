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
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordFormSchema } from '@/schemas/auth-schemas';
import { Message } from './message';
import { resetPassword } from '@/actions/auth';
import { useState } from 'react';
import { appConfig } from '@/config/shipper.appconfig';

export type TResetPasswordSchema = z.infer<typeof resetPasswordFormSchema>;

export function ResetPasswordForm({}) {
    const form = useForm({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            email: '',
        },
    });
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const successCard = success && (
        <Message message={success} variant={'success'} />
    );
    const errorCard = error && <Message message={error} variant={'error'} />;

    const onSubmit = async (values: TResetPasswordSchema) => {
        console.log('values', values);
        try {
            const res = await resetPassword(values);
            setSuccess(res?.success);
            setError(res?.error);
        } catch (error) {}
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>e-mail</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='tuemail@tuweb.com'
                                    {...field}
                                    autoComplete='email'
                                />
                            </FormControl>
                            <FormDescription>
                                {`Email con el que te diste de alta en ${appConfig.general.appName}`}
                                <br />
                                <br />
                                {`Te enviaremos un link para que puedas cambiar tu contraseña`}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {successCard}
                {errorCard}
                <Button type='submit' disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <div className='flex flex-row gap-2'>Enviando link</div>
                    ) : (
                        `Enviar link`
                    )}
                </Button>
            </form>
        </Form>
    );
}
