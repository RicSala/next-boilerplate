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
import { config } from '@/config/shipper.config';
import { Message } from './message';

type TResetPasswordSchema = z.infer<typeof resetPasswordFormSchema>;

export function ResetPasswordForm({}) {
    const form = useForm({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (values: TResetPasswordSchema) => {
        console.log('values', values);
        try {
            // TODO: It's throwing an error due to a bug in the library: https://github.com/nextauthjs/next-auth/issues/9279.
            // will be fixed in the next release.
            const response = await signIn('nodemailer', {
                callbackUrl: `${config.routes.settings}?message=reset-password`,
                email: values.email,
                redirect: false,
            });

            console.log('response', response);
        } catch (error) {
            console.log('error', error);
        }
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
                                {`Email con el que te diste de alta en ${config.general.appName}`}
                                <br />
                                <br />
                                {`Te enviaremos un link para que puedas cambiar tu contraseña`}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {form.formState.isSubmitSuccessful && (
                    <Message
                        variant={'success'}
                        message={'Email enviado. Revisa tu bandeja de entrada'}
                    />
                )}
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
