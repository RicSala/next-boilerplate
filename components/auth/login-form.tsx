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
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { type } from 'os';
import { useState } from 'react';
import { Message } from './message';
import { appConfig } from '@/config/shipper.appconfig';

type LoginFormProps = {
    isRedirected?: boolean;
    onAuth?: () => void;
};

export function LoginForm({ isRedirected, onAuth }: LoginFormProps) {
    const form = useForm({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: 'ricardo@grouz.io',
            password: '88888888k',
        },
    });

    const [errorRes, setErrorRes] = useState<string | null>(null);

    // get the callbackUrl from query params
    const query = useSearchParams();
    const callbackUrl = query.get('callbackUrl');
    const error = query.get('error');

    const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
        try {
            const res = await signIn('credentials', {
                ...values,
                redirect: isRedirected,
                callbackUrl:
                    // Send the user to where he was before or the default route
                    callbackUrl || appConfig.routes.defaultLogingRedirect,
            });

            if (res!.error) {
                setErrorRes(res!.error);
            } else {
                onAuth && onAuth();
            }
        } catch (error) {
            console.log(error);
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
                                    {`Email con el que te diste de alta en ${appConfig.general.appName}`}
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
                                    {`Si no la recuerdas, escríbenos a
                                    ${appConfig.email.supportEmail}`}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Message
                        message={
                            errors[errorRes as TSigninErrors] ||
                            errors[error as TSigninErrors]
                        }
                        variant={'error'}
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
        </>
    );
}

export const errors = {
    Signin: 'Error al iniciar sesión',
    OAuthSignin: 'Error al iniciar sesión',
    OAuthCallback: 'Error al iniciar sesión',
    OAuthCreateAccount: 'Error al iniciar sesión',
    EmailCreateAccount: 'Error al iniciar sesión',
    CallbackRouteError: 'Error al iniciar sesión',
    OAuthAccountNotLinked:
        'To confirm your identity, sign in with the same account you used originally.',
    EmailSignin: 'Check your email address.',
    CredentialsSignin: 'Error al iniciar sesión. Revisa tus credenciales.',
    default: 'Unable to sign in.',
};

type TSigninErrors = keyof typeof errors;

type SignInErrorProps = {
    error: string;
};
const SignInError = ({ error }: SignInErrorProps) => {
    const errorMessage =
        error && (errors[error as TSigninErrors] ?? errors.default);
    return <div>{errorMessage}</div>;
};
