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

export function ResetPasswordForm({}) {
    const form = useForm({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            email: 'ricardo@grouz.io',
        },
    });

    // @ts-ignore
    const onSubmit = async (values) => {
        console.log('values', values);
        try {
            // TODO: It's throwing an error due to a bug in the library: https://github.com/nextauthjs/next-auth/issues/9279.
            // will be fixed in the next release.
            const response = await signIn('email', {
                callbackUrl: config.routes.defaultLogingRedirect,
                email: values.email,
                redirect: false,
            });

            console.log('response', response);
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8'
                >
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>e-mail</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Aquí va tu email'
                                        {...field}
                                        autoComplete='email'
                                    />
                                </FormControl>
                                <FormDescription>
                                    Email con el que te diste de alta en TATTUO
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type='submit'
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? (
                            <div className='flex flex-row gap-2'>
                                Enviando link
                            </div>
                        ) : (
                            `Enviar link`
                        )}
                    </Button>
                </form>
            </Form>
        </>
    );
}
