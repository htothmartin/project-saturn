'use client';

import { BrandSection } from '@/components/BrandSection';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import SkyBackground from './sky';

const loginSchema = z.object({
    email: z.string().email('This is not a valid email address.'),
    password: z.string(),
});

const Login = () => {
    const { toast } = useToast();
    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>): void => {
        toast({
            title: 'Login',
            description: 'Sucessfully login.',
        });
        console.log(values);
    };

    return (
        <div className="grid h-screen w-screen grid-cols-2 overflow-hidden bg-cover bg-no-repeat">
            <BrandSection />
            <div className="m-auto flex w-3/4 max-w-md flex-col rounded-lg border-2 border-solid border-primary bg-slate-100 bg-opacity-10 p-16 backdrop-blur-md">
                <h1 className="pb-4 text-4xl font-bold">Sign In</h1>
                <Form {...loginForm}>
                    <form
                        onSubmit={loginForm.handleSubmit(onSubmit)}
                        className="my-4"
                    >
                        <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-2xl">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example@email.com"
                                            {...field}
                                            className="text-xl"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-2xl">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""
                                            {...field}
                                            className="text-xl"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="mx-auto my-4">
                            <Button className="text-xl" type="submit">
                                Login
                            </Button>
                        </div>
                    </form>
                </Form>
                <p className="text-center">
                    You don &apos; t haven an accounct? Registere{' '}
                    <Link className="underline" href="/register">
                        here
                    </Link>{' '}
                    !
                </p>
            </div>
        </div>

        /*
		<div className={styles.grid}>
			<BrandSection />
			<div className={styles.grid__form}>
				<div className={styles.grid__signin}>
					<h1>Sign In</h1>
				</div>
				<Input id="login-email" name="login-email" />
				<Input type="password" name="login-password" id="login-password" />
				<Button.Primary type="submit">Login</Button.Primary>
				<p className={styles.register__link}>
					You don &apos; t haven an accounct? Registere{' '}
					<Link href="/register">here</Link> !
				</p>
			</div>
		</div>
        </SkyBackground>

    */
    );
};

export default Login;
