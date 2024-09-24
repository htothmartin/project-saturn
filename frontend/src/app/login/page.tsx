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
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('This is not a valid email address.'),
    password: z.string(),
});

const Login = () => {
    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        console.log(values);
    };

    return (
        <div className="relative grid h-screen w-screen grid-cols-2 overflow-hidden bg-login">
            <BrandSection />
            <Form {...loginForm}>
                <form
                    onSubmit={loginForm.handleSubmit(onSubmit)}
                    className="m-auto flex w-3/4 max-w-md flex-col rounded-lg border-2 border-solid border-primary p-16 backdrop-blur-md"
                >
                    <h1 className="text">Sign In</h1>
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
                    <Button className="text-xl" type="submit">
                        Login
                    </Button>
                </form>
            </Form>
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

    */
    );
};

export default Login;
