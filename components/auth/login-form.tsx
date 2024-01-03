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
import { CardWrapper } from '../shared/card-wrapper';
import { signInFormSchema } from '@/schemas/auth-schemas';
import { signIn, useSession } from 'next-auth/react';

export function LoginForm({}) {
    const form = useForm({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: 'ricardo@grouz.io',
            password: '88888888k',
        },
    });

    const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
        const res = await signIn('credentials', {
            ...values,
            callbackUrl: `${window.location.origin}`,
        });

        console.log(res);
    };

    return (
        <CardWrapper
            backButtonLabel='¿No tienes una cuenta?'
            backButtonHref='/auth/register'
            headerLabel='Iniciar sesión'
            showSocial
        >
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
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Aquí va tu contraseña'
                                        {...field}
                                        autoComplete='current-password'
                                        type='password'
                                    />
                                </FormControl>
                                <FormDescription>
                                    Si no la recuerdas, escríbenos a
                                    hello@tattuo.com.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type='submit'
                        disabled={form.formState.isSubmitting}
                        className='w-full'
                    >
                        {form.formState.isSubmitting ? (
                            <div className='flex flex-row gap-2'>Entrando</div>
                        ) : (
                            `Entrar`
                        )}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
