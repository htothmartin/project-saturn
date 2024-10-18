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
import { AuthLayout } from '@/components/AuthLayout/AuthLayout';
import { LoginReq } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { Auth } from '@/context/AuthProvider';

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
  const router = useRouter();
  const [pending, setPending] = useState<boolean>(false);
  const { setAuth } = useAuth();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setPending(true);
    try {
      const data = await LoginReq(values.email, values.password);
      setAuth((prev: Auth) => {
        return { ...prev, accessToken: data.accessToken };
      });

      toast({
        title: 'Login',
        description: 'Sucessfully login.',
      });
      router.push('/projects');
    } catch (error) {
      console.log(error);
      toast({
        title: 'Login',
        description: 'Login failed.',
      });
    }
    setPending(false);
  };

  return (
    <AuthLayout>
      <>
        <BrandSection />
        <div className="m-auto flex w-3/4 max-w-md flex-col rounded-lg border-2 border-solid border-primary bg-slate-100 bg-opacity-10 p-16 backdrop-blur-md">
          <h1 className="pb-4 text-4xl font-bold">Sign In</h1>
          <Form {...loginForm}>
            <form
              method="POST"
              onSubmit={loginForm.handleSubmit(onSubmit)}
              className="my-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-2xl">Email</FormLabel>
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
                    <FormLabel className="text-2xl">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="password"
                        {...field}
                        className="text-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mx-auto my-4">
                <Button className="text-xl" type="submit" disabled={pending}>
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
      </>
    </AuthLayout>
  );
};

export default Login;
